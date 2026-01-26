const theatreController = require("../controllers/theatre.controller");
const theatresMiddlewares = require("../middlewares/theatre.middleware");
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatresMiddlewares.validateTheatreRequest,
    theatreController.create,
  );
};

module.exports = routes;
