const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const bookingService = require("../services/booking.service");
const { STATUS } = require("../utils/constants");
const create = async (req, res) => {
  try {
    let userId = req.user;
    const response = await bookingService.createBooking({
      ...req.body,
      userId: userId,
    });
    successResponseBody.message = "Booking created successfully";
    successResponseBody.data = response;
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = error.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const update = async (req, res) => {
  try {
    const response = await bookingService.updateBooking(
      req.body,
      req.params.id,
    );
    successResponseBody.message = "Booking updated successfully";
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = error.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getBookings = async (req, res) => {
  try {
    const response = await bookingService.getBookings({ userId: req.user });
    successResponseBody.message = "Bookings fetched successfully";
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = error.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getAllBookings = async (req, res) => {
  try {
    const response = await bookingService.getAllBookings();
    successResponseBody.message = "All bookings fetched successfully";
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = error.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = {
  create,
  update,
  getBookings,
  getAllBookings,
};
