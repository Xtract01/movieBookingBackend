const movieController = require("../controllers/movie.controller");
const movieMiddlewares = require("../middlewares/movie.middleware");
const routes = (app) => {
  //routes functiont takes express app as input and sets up the routes
  app.post(
    "/mba/api/v1/movies",
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie,
  );
  app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);
};
module.exports = routes;
