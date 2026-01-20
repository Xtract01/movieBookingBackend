const Movie = require("../models/movie.model");
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "Successfully created movie",
    });
  } catch (err) {
    console.log("Error in creating movie:", err);
    return res.status(500).json({
      success: false,
      error: err,
      data: {},
      message: "Unable to create movie",
    });
  }
};
module.exports = { createMovie };
