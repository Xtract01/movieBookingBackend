const User = require("../models/user.model");
const { USER_ROLE, USER_STATUS } = require("../utils/constants");
const createUser = async (data) => {
  try {
    if (!data.userRole || data.userRole === USER_ROLE.customer) {
      if (data.userStatus && data.userStatus != USER_STATUS.approved) {
        throw {
          err: "We cannot set any status other than APPROVED for a CUSTOMER",
          code: 400,
        };
      }
    }
    if (data.userRole && data.userRole != USER_ROLE.customer) {
      data.userStatus = USER_STATUS.pending;
    }
    const response = await User.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err, code: 400 };
    }
    throw error;
  }
};
const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw { err: "User with the given email does not exist", code: 404 };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = { createUser, getUserByEmail };
