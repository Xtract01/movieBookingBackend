const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

const createMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    successResponseBody.data = movie;
    successResponseBody.message = "Movie created successfully";
    return res.status(201).json(successResponseBody);
  } catch (err) {
    console.log("Error in creating movie:", err);
    return res.status(500).json(errorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Movie deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log("Error in deleting movie:", err);
    return res.status(500).json(errorResponseBody);
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
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log("Error in fetching movie:", err);
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = { createMovie, deleteMovie, getMovie };
