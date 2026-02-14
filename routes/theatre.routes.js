const theatreController = require("../controllers/theatre.controller");
const theatresMiddlewares = require("../middlewares/theatre.middleware");
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatresMiddlewares.validateTheatreRequest,
    theatreController.create,
  );
  app.delete("mba/api/v1/theatres/:id", theatreController.destroy);
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
  app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
  app.patch(
    "/mba/api/v1/theatres/:id/movies",
    theatresMiddlewares.validateUpdateMovies,
    theatreController.updateMoviesInTheatre,
  );
  app.get(
    "/mba/api/v1/theatres/:id/movies",
    theatreController.getMoviesInTheatre,
  );
};

module.exports = routes;
