const theatreService = require("../services/theatre.service");

const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody");
const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed";
      return res.status(400).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(201).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = "Error in creating theatre";
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = { create };
