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
module.exports = { validateTheatreRequest };
