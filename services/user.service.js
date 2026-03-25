const User = require("../models/user.model");
const { USER_ROLE, USER_STATUS, STATUS } = require("../utils/constants");
const createUser = async (data) => {
  try {
    if (!data.userRole || data.userRole === USER_ROLE.customer) {
      if (data.userStatus && data.userStatus != USER_STATUS.approved) {
        throw {
          err: "We cannot set any status other than APPROVED for a CUSTOMER",
          code: STATUS.BAD_REQUEST,
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
      throw { err, code: STATUS.BAD_REQUEST };
    }
    throw error;
  }
};
const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw {
        err: "User with the given email does not exist",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
const getUserById = async (id) => {
  try {
    const response = await User.findById(id);
    if (!response) {
      throw {
        err: "User with the given ID does not exist",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
const updateUserRoleorStatus = async (data, userId) => {
  try {
    let updateQuery = {};
    if (data.userRole) {
      updateQuery.userRole = data.userRole;
    }
    if (data.userStatus) {
      updateQuery.userStatus = data.userStatus;
    }

    const response = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      throw {
        err: "User with the given ID does not exist",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
    }
    throw error;
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserRoleorStatus,
};
