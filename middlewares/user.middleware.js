const { errorResponseBody } = require("../utils/responseBody");

const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    return res
      .status(400)
      .json(
        errorResponseBody(
          "Malformed request, please send at least one parameter",
        ),
      );
  }
  next();
};

module.exports = {
  validateUpdateUserRequest,
};
