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

const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return movie;
  } catch (err) {
    if (err.name === "ValidationError") {
      let error = {};
      Object.keys(err.errors).forEach((key) => {
        error[key] = err.errors[key].message;
      });
      return { err: error, code: 400 };
    } else {
      throw err;
    }
  }
};

const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);
  if (!movies) {
    return {
      err: "No Movies found",
      code: 404,
    };
  }
  return movies;
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovies,
};
