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
  app.put("/mba/api/v1/movies/:id", movieController.updateMovie);
  app.patch("/mba/api/v1/movies/:id", movieController.updateMovie);
  app.get("/mba/api/v1/movies", movieController.getMovies);
};
module.exports = routes;
