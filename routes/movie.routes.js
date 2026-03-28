const movieController = require("../controllers/movie.controller");
const movieMiddlewares = require("../middlewares/movie.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const routes = (app) => {
  //routes functiont takes express app as input and sets up the routes
  app.post(
    "/mba/api/v1/movies",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie,
  );
  app.delete(
    "/mba/api/v1/movies/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.deleteMovie,
  );
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);
  app.put(
    "/mba/api/v1/movies/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie,
  );
  app.patch(
    "/mba/api/v1/movies/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie,
  );
  app.get("/mba/api/v1/movies", movieController.getMovies);
};
module.exports = routes;
