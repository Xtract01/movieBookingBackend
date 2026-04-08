const Show = require("../models/show.model");
const { STATUS } = require("../utils/constants");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const createShow = async (data) => {
  try {
    const theatre = await Theatre.findById(data.theatreId);
    if (!theatre) {
      throw {
        err: "Theatre not found",
        code: STATUS.NOT_FOUND,
      };
    }
    if (theatre.movies.indexOf(data.movieId) === -1) {
      throw {
        err: "Movie not found in the theatre",
        code: STATUS.NOT_FOUND,
      };
    }

    const movie = await Movie.findById(data.movieId);
    if (!movie) {
      throw {
        err: "Movie not found",
        code: STATUS.NOT_FOUND,
      };
    }
    const response = await Show.create(data);
    return response;
  } catch (err) {
    if (err.name === "ValidationError") {
      let err = {};
      Object.keys(err.errors).forEach((key) => {
        err[key] = err.errors[key].message;
      });
      throw {
        err,
        code: STATUS.UNPROCESSABLE_ENTITY,
      };
    }
    throw err;
  }
};

const getShows = async (data) => {
  try {
    let filter = {};
    if (data.theatreId) {
      filter.theatreId = data.theatreId;
    }
    if (data.movieId) {
      filter.movieId = data.movieId;
    }
    const response = await Show.find(filter);
    if (!response) {
      throw {
        err: "No shows found",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (err) {
    throw err;
  }
};

const deleteShow = async (id) => {
  try {
    const response = await Show.findByIdAndDelete(id);
    if (!response) {
      throw {
        err: "Show not found",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const updateShow = async (id, data) => {
  try {
    const response = await Show.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      throw {
        err: "Show not found",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err,
        code: STATUS.UNPROCESSABLE_ENTITY,
      };
    }

    throw error;
  }
};
module.exports = {
  createShow,
  getShows,
  deleteShow,
  updateShow,
};
