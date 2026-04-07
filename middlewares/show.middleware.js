const { STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");
const ObjectId = require("mongoose").Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
  if (!req.body.theatreId) {
    errorResponseBody.err = "Theatre ID is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!ObjectId.isValid(req.body.theatreId)) {
    errorResponseBody.err = "Invalid Theatre ID";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!req.body.movieId) {
    errorResponseBody.err = "Movie ID is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!ObjectId.isValid(req.body.movieId)) {
    errorResponseBody.err = "Invalid Movie ID";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!req.body.timing) {
    errorResponseBody.err = "Show timing is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!req.body.noOfSeats) {
    errorResponseBody.err = "Number of seats is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!req.body.price) {
    errorResponseBody.err = "Show price is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  next();
};
module.exports = { validateCreateShowRequest };
