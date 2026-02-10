const theatreService = require("../services/theatre.service");

const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody");
const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed";
      return res.status(400).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(201).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = "Error in creating theatre";
    return res.status(500).json(errorResponseBody);
  }
};

const destroy = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Theatre deletion failed";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = "Error in deleting theatre";
    return res.status(500).json(errorResponseBody);
  }
};

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Theatre not found";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre retrieved successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = "Error in retrieving theatre";
    return res.status(500).json(errorResponseBody);
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Theatres retrieved successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    return res.status(500).json(errorResponseBody);
  }
};

const updateMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatre(
      req.params.id,
      req.body.movieId,
      req.body.insert,
    );
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Updating movies in theatre failed";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movies in theatre updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = "Error in updating movies in theatre";
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = {
  create,
  destroy,
  getTheatre,
  getAllTheatres,
  updateMoviesInTheatre,
};
