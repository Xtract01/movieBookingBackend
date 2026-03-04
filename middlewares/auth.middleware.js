const { errorResponseBody } = require("../utils/responseBody");
const validateSignUpRequest = async (req, res, next) => {
  if (!req.body.name) {
    errorResponseBody.err = "Name is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.email) {
    errorResponseBody.err = "Email is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.password) {
    errorResponseBody.err = "Password is required";
    return res.status(400).json(errorResponseBody);
  }
  next();
  n;
};
module.exports = { validateSignUpRequest };
