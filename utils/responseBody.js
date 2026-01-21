const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong can't fetch movie",
  success: false,
};

const successResponseBody = {
  data: {},
  message: "Successfully processed request",
  success: true,
};
module.exports = { errorResponseBody, successResponseBody };
