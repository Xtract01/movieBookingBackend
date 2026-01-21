const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  const movie = await Movie.create(data);
  return movie;
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
