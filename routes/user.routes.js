const userController = require("../controllers/user.controller");
const userMiddlewares = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const route = (app) => {
  app.patch(
    "/mba/api/v1/users/:id",
    authMiddleware.isAuthenticated,
    userMiddlewares.validateUpdateUserRequest,
    authMiddleware.isAdmin,
    userController.update,
  );
};
module.exports = route;
