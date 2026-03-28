const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const { STATUS } = require("../utils/constants");
const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed";
      errorResponseBody.code = response.code;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie created successfully";
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Validation failed";
      return res.status(err.code).json(errorResponseBody);
    }
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Movie deletion failed";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie deleted successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Movie deletion failed";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovies(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovie(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie updated successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getMovies = async (req, res) => {
  try {
    const response = await movieService.fetchMovies(req.query);
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = { createMovie, deleteMovie, getMovie, updateMovie, getMovies };
