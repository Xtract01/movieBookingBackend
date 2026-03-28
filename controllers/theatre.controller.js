const theatreService = require("../services/theatre.service");

const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody");
const { STATUS } = require("../utils/constants");
const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Validation failed";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in creating theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const destroy = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Theatre deletion failed";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in deleting theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre retrieved successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Theatre not found";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in retrieving theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Theatres retrieved successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const update = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(
      req.params.id,
      req.body,
    );

    successResponseBody.data = response;
    successResponseBody.message = "Theatre updated successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Theatre update failed";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in updating theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const updateMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatre(
      req.params.id,
      req.body.movieId,
      req.body.insert,
    );

    successResponseBody.data = response;
    successResponseBody.message = "Movies in theatre updated successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Updating movies in theatre failed";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in updating movies in theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInTheatre(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Movies in theatre retrieved successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Theatre not found";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in getting movies in theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const checkMovieInTheatre = async (req, res) => {
  try {
    const response = await theatreService.checkMovieInTheatre(
      req.params.theatreId,
      req.params.movieId,
    );
    successResponseBody.data = response;
    successResponseBody.message = "Checked movie in theatre successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Theatre not found";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.message = "Error in checking movie in theatre";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = {
  create,
  destroy,
  getTheatre,
  update,
  getAllTheatres,
  updateMoviesInTheatre,
  getMoviesInTheatre,
  checkMovieInTheatre,
};
