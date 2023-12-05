const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const paymentSchema = mongoose.model("razopay", schema);

module.exports = paymentSchema;
