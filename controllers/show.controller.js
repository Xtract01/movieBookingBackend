const showService = require("../services/show.service");
const { STATUS } = require("../utils/constants");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody");
const create = async (req, res) => {
  try {
    const response = await showService.createShow(req.body);
    successResponseBody.message = "Show created successfully";
    successResponseBody.data = response;
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.message;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = { create };
