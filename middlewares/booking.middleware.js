const { STATUS, USER_ROLE, BOOKING_STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");
const theatreService = require("../services/theatre.service");
const ObjectId = require("mongoose").Types.ObjectId;
const userService = require("../services/user.service");
const validateBookingCreateRequest = async (req, res, next) => {
  if (!req.body.theatreId) {
    errorResponseBody.message = "theatreId is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  // Validate theatreId is a valid ObjectId
  if (!ObjectId.isValid(req.body.theatreId)) {
    errorResponseBody.message = "Invalid theatreId";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  const theatre = await theatreService.getTheatre(req.body.theatreId);
  if (!theatre) {
    errorResponseBody.message = "Theatre not found";
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }
  if (!req.body.movieId) {
    errorResponseBody.message = "movieId is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!ObjectId.isValid(req.body.movieId)) {
    errorResponseBody.message = "Invalid movieId";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!theatre.movies.includes(req.body.movieId)) {
    errorResponseBody.message = "Movie not found in the theatre";
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }
  if (!req.body.timings) {
    errorResponseBody.message = "timings are required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if (!req.body.noOfSeats) {
    errorResponseBody.message = "noOfSeats is required";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  next();
};
const canChangeStatus = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (
    user.userRole == USER_ROLE.customer &&
    req.body.status &&
    req.body.status != BOOKING_STATUS.cancelled
  ) {
    errorResponseBody.err = "Only admin can change the booking status";
    return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
  }
  next();
};
module.exports = { validateBookingCreateRequest, canChangeStatus };
