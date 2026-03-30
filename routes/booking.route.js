const bookingController = require("../controllers/booking.controller");
const autMiddleware = require("../middlewares/auth.middleware");
const bookingMiddleware = require("../middlewares/booking.middleware");
const routes = (app) => {
  app.post(
    "/mba/api/v1/booking",
    autMiddleware.isAuthenticated,
    bookingMiddleware.validateBookingCreateRequest,
    bookingController.create,
  );
};
module.exports = routes;
