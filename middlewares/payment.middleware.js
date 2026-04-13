const { STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");
const ObjectId = require("mongoose").Types.ObjectId;

const verifyPaymentCreateRequest = (req, res, next) => {
  if (!req.body.bookingId || !ObjectId.isValid(req.body.bookingId)) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody("Invalid bookingId"));
  }
  if (
    !req.body.amount ||
    typeof req.body.amount !== "number" ||
    req.body.amount <= 0
  ) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody("Invalid amount"));
  }
  next();
};
module.exports = {
  verifyPaymentCreateRequest,
};
