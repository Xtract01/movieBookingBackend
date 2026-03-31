const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const bookingMiddleware = require("../middlewares/booking.middleware");
const routes = (app) => {
  app.post(
    "/mba/api/v1/booking",
    authMiddleware.isAuthenticated,
    bookingMiddleware.validateBookingCreateRequest,
    bookingController.create,
  );
  app.patch(
    "/mba/api/v1/booking/:id",
    authMiddleware.isAuthenticated,
    bookingMiddleware.canChangeStatus,
    bookingController.update,
  );
};
module.exports = routes;
