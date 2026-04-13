const paymentController = require("../controllers/payment.controller");
const paymentMiddleware = require("../middlewares/payment.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  verifyPaymentCreateRequest,
} = require("../middlewares/payment.middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/payments",
    authMiddleware.isAuthenticated,
    paymentMiddleware.verifyPaymentCreateRequest,
    paymentController.create,
  );
  app.get(
    "/mba/api/v1/payments/:id",
    authMiddleware.isAuthenticated,
    paymentController.getPaymentDetailsById,
  );
};
module.exports = routes;
