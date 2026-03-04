const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLE, USER_STATUS } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userRole: {
      type: String,
      required: true,
      enum: {
        values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
        message: "User role must be either CUSTOMER, ADMIN or CLIENT",
      },
      default: USER_ROLE.customer,
    },
    userStatus: {
      type: String,
      required: true,
      enum: {
        values: [
          USER_STATUS.approved,
          USER_STATUS.pending,
          USER_STATUS.rejected,
        ],
        message: "User status must be either APPROVED, PENDING or REJECTED",
      },
      default: USER_STATUS.approved,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
