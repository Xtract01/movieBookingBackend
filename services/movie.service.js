const Movie = require("../models/movie.model");
const { STATUS } = require("../utils/constants");
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
      throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
    } else {
      throw new err();
    }
  }
};

const getMovies = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw {
      err: "No Movie found",
      code: STATUS.NOT_FOUND,
    };
  }
  return movie;
};

const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if (!response) {
      throw {
        err: "Movie not found",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (err) {
    throw err;
  }
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
      throw { err: error, code: STATUS.BAD_REQUEST };
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
    throw {
      err: "No Movies found",
      code: STATUS.NOT_FOUND,
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
