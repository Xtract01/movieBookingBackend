const Theatre = require("../models/theatre.model");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (err) {
    if (err.name === "ValidationError") {
      let error = {};
      Object.keys(err.errors).forEach((key) => {
        error[key] = err.errors[key].message;
      });
      return { err: error, code: 400 };
    }
    throw err;
  }
};

const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return { err: "Theatre not found", code: 404 };
    }
    return response;
  } catch (err) {
    throw err;
  }
};

const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      return { err: "Theatre not found", code: 404 };
    }
    return response;
  } catch (err) {
    throw err;
  }
};

const getAllTheatres = async () => {
  try {
    const response = await Theatre.find({});
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateMoviesInTheatre = async (theatreId, movieId, insert) => {
  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    return { err: "Theatre not found", code: 404 };
  }
  if (insert) {
    //add movies
    movieId.forEach((id) => {
      theatre.movies.push(id);
    });
  } else {
    //remove movies
    let savedMovieIds = theatre.movies;
    movieId.forEach((id) => {
      savedMovieIds = savedMovieIds.filter((smi) => smi == movieId);
    });
    theatre.movies = savedMovieIds;
  }
  await theatre.save();
  return theatre.populate("movies");
};
module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getAllTheatres,
  updateMoviesInTheatre,
};
