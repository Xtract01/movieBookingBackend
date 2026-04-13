const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const {
  STATUS,
  BOOKING_STATUS,
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const paymentService = require("../services/payment.service");
const create = async (req, res) => {
  try {
    const response = await paymentService.createPayment(req.body);
    if (response.status === BOOKING_STATUS.cancelled) {
      errorResponseBody.err = "Payment failed, booking cancelled";
      errorResponseBody.data = response;
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if (response.status === BOOKING_STATUS.expired) {
      errorResponseBody.err = "Payment failed, booking expired";
      errorResponseBody.data = response;
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (err) {
    if (err.status) {
      errorResponseBody.err = err.message;
      return res.status(err.status).json(errorResponseBody);
    }
    errorResponseBody.err = "Internal Server Error";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getPaymentDetailsById = async (req, res) => {
  try {
    const response = await paymentService.getPaymentById(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Payment details fetched successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.status) {
      errorResponseBody.err = err.message;
      return res.status(err.status).json(errorResponseBody);
    }
    errorResponseBody.err = "Internal Server Error";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
module.exports = {
  create,
  getPaymentDetailsById,
};
