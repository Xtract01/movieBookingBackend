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
module.exports = { createTheatre, getTheatre, deleteTheatre, getAllTheatres };
