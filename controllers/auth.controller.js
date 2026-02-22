const userService = require("../services/user.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody.js");

const signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    successResponseBody.data = response;
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = { signup };
