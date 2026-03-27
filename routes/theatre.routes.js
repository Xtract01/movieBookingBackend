const theatreController = require("../controllers/theatre.controller");
const theatresMiddlewares = require("../middlewares/theatre.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatresMiddlewares.validateTheatreRequest,
    theatreController.create,
  );
  app.delete(
    "/mba/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.destroy,
  );
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
  app.get(
    "/mba/api/v1/theatres/:theatreId/movies/:movieId",
    theatreController.checkMovieInTheatre,
  );
};

module.exports = routes;
