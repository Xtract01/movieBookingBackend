const USER_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED",
};
const USER_ROLE = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  client: "CLIENT",
};
const STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
};
const BOOKING_STATUS = {
  cancelled: "CANCELLED",
  processing: "IN_PROCESS",
  successfull: "SUCCESSFULL",
};
const PAYMENT_STATUS = {
  success: "SUCCESS",
  failed: "FAILED",
  pending: "PENDING",
};
module.exports = {
  USER_STATUS,
  USER_ROLE,
  STATUS: STATUS_CODE,
  BOOKING_STATUS,
  PAYMENT_STATUS,
};
