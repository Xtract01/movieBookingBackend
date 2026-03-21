const userService = require("../services/user.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const update = async (req, res) => {
  try {
    const response = await userService.updateUserRoleorStatus(
      req.body,
      req.params.id,
    );

    if (!response) {
      errorResponseBody.err = "User with the given ID does not exist";
      return res.status(404).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "User updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    errorResponseBody.err = error.message;
    res.status(500).json(errorResponseBody(error.message));
  }
};
module.exports = { update };
