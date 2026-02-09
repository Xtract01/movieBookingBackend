const { errorResponseBody } = require("../utils/responseBody");
const validateTheatreRequest = async (req, res, next) => {
  if (!req.body.name) {
    errorResponseBody.message = "Theatre name is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.pincode) {
    errorResponseBody.message = "Pincode is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.city) {
    errorResponseBody.message = "City is required";
    return res.status(400).json(errorResponseBody);
  }
  next();
};

const validateUpdateMovies = async (req, res, next) => {
  if (req.body.insert === undefined) {
    errorResponseBody.message = "Insert field is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.movieId) {
    errorResponseBody.message = "Movie ID(s) are required";
    return res.status(400).json(errorResponseBody);
  }
  if (!(req.body.movieId instanceof Array)) {
    errorResponseBody.message = "Movie IDs should be in an array";
    return res.status(400).json(errorResponseBody);
  }
  if (req.body.movieId.length == 0) {
    errorResponseBody.message = "At least one Movie ID is required";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
module.exports = { validateTheatreRequest, validateUpdateMovies };
