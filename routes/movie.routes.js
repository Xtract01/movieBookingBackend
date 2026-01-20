const movieController = require("../controllers/movie.controller");
const routes = (app) => {
  //routes functiont takes express app as input and sets up the routes
  app.post("/mba/api/v1/movies", movieController.createMovie);
};
module.exports = routes;
