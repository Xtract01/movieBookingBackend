const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

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

const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data.city) {
      query.city = data.city;
    }
    if (data && data.pincode) {
      query.pincode = data.pincode;
    }
    if (data && data.name) {
      query.name = data.name;
    }
    if (data && data.movieId) {
      query.movies = { $all: data.movieId };
    }
    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination);
    return response;
  } catch (err) {
    throw err;
  }
};

const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
  try {
    let theatre;
    if (insert) {
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true },
      );
    } else {
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true },
      );
    }
    return theatre.populate("movies");
  } catch (err) {
    if (err.name === "TypeError") {
      return { err: "Theatre not found", code: 404 };
    }
    throw err;
  }
};
module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getAllTheatres,
  updateMoviesInTheatre,
};
