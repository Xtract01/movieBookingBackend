const userService = require("../services/user.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const { STATUS } = require("../utils/constants");
const update = async (req, res) => {
  try {
    const response = await userService.updateUserRoleorStatus(
      req.body,
      req.params.id,
    );

    if (!response) {
      errorResponseBody.err = "User with the given ID does not exist";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "User updated successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    errorResponseBody.err = error.message;
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
module.exports = { update };
