const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" },
    // user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    userInformation:{
      name:{type:String},
      email:{type:String},
      phone:{type:String},
      address:{type:String},
      city:{type:String},
      code:{type:String},
      dl:{type:String},
      temp:{type:Array}
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    // driverRequired: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookings", bookingSchema);
