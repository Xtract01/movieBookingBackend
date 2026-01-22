const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (err) {
    if (err.name === "ValidationError") {
      let err = {};
      Object.keys(err.errors).forEach((key) => {
        err[key] = err.errors[key].message;
      });
      return { err, code: 400 };
    } else {
      throw new err();
    }
  }
};

const getMovies = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    return {
      err: "No Movie found",
      code: 404,
    };
  }
  return movie;
};

const deleteMovie = async (id) => {
  const response = await Movie.findByIdAndDelete(id);
  return response;
};

module.exports = { getMovies, createMovie, deleteMovie };
