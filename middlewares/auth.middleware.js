const jwt = require("jsonwebtoken");
const { errorResponseBody } = require("../utils/responseBody");
const userService = require("../services/user.service");
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
};
const validateSignInRequest = async (req, res, next) => {
  if (!req.body.email) {
    errorResponseBody.err = "Email is required";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.password) {
    errorResponseBody.err = "Password is required";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      errorResponseBody.err = "Token is required";
      return res.status(401).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      errorResponseBody.err = "Invalid token";
      return res.status(401).json(errorResponseBody);
    }
    const user = await userService.getUserById(response.id);
    if (!user) {
      errorResponseBody.err = "User not found";
      return res.status(404).json(errorResponseBody);
    }
    req.user = user.id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      errorResponseBody.err = "Invalid token";
      return res.status(401).json(errorResponseBody);
    }
    if (error.code === 404) {
      errorResponseBody.err =
        "The user corresponding to the token does not exist";
      return res.status(404).json(errorResponseBody);
    }
    errorResponseBody.err = "Invalid token";
    return res.status(401).json(errorResponseBody);
  }
};
module.exports = {
  validateSignUpRequest,
  validateSignInRequest,
  isAuthenticated,
};
