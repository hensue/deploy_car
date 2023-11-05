const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")("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");
const { v4: uuidv4 } = require("uuid");

const Booking = require("../models/bookingModel");

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  // console.log("here",req.body.userInformation)
  try {
    // console.log("token", token)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // console.log("customer", customer)

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();
      res.send("Your booking is successful!");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log("bookings", bookings)
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
