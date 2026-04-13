const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const {
  STATUS,
  BOOKING_STATUS,
  PAYMENT_STATUS,
} = require("../utils/constants");
const createPayment = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    if (booking.status == BOOKING_STATUS.successfull) {
      throw {
        err: "Payment already done for this booking",
        code: STATUS.BAD_REQUEST,
      };
    }
    if (!booking) {
      throw {
        status: STATUS.NOT_FOUND,
        message: "Booking not found",
      };
    }
    let bookingTime = booking.createdAt;
    let currentTime = new Date();
    let minutes = Math.floor((currentTime - bookingTime) / 1000 / 60);
    if (minutes > 5) {
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      return booking;
    }
    const payment = await Payment.create({
      bookingId: data.bookingId,
      amount: data.amount,
    });
    if (payment.amount !== booking.totalCost) {
      payment.status = PAYMENT_STATUS.failed;
    }
    if (!payment || payment.status === PAYMENT_STATUS.failed) {
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      return booking;
    }
    payment.status = PAYMENT_STATUS.success;
    await payment.save();
    booking.status = BOOKING_STATUS.confirmed;
    await booking.save();
    return payment;
  } catch (err) {
    throw err;
  }
};
const getPaymentById = async (id) => {
  try {
    const payment = await Payment.findById(id).populate("bookingId");
    if (!payment) {
      throw {
        status: STATUS.NOT_FOUND,
        message: "Payment not found",
      };
    }
    return payment;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPayment,
  getPaymentById,
};
