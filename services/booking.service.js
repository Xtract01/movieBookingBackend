const Booking = require("../models/booking.model");
const { STATUS } = require("../utils/constants");
const createBooking = async (data) => {
  try {
    const response = await Booking.create(data);
    return response;
  } catch (error) {
    console.error("Error creating booking:", error);
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { error: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};
const updateBooking = async (data, bookingId) => {
  try {
    const response = await Booking.findByIdAndUpdate(bookingId, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      throw { error: "Booking not found", code: STATUS.NOT_FOUND };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { error: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    console.error("Error updating booking:", error);
    throw error;
  }
};
const getBookings = async (data) => {
  try {
    const response = await Booking.find(data);
    return response;
  } catch (error) {
    throw error;
  }
};
const getAllBookings = async () => {
  try {
    const response = await Booking.find({});
    return response;
  } catch (error) {
    throw error;
  }
};
const getBookingById = async (id, userId) => {
  try {
    const response = await Booking.findById(id);

    if (!response) {
      throw { error: "Booking not found", code: STATUS.NOT_FOUND };
    }
    if (response.userId.toString() !== userId.toString()) {
      throw { error: "Unauthorized access", code: STATUS.UNAUTHORIZED };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBookings,
  getBookingById,
};
