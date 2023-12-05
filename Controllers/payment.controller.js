const httpError = require("http-errors");
const Razorpay = require("razorpay");
const { ORDER_CREATED_SUCCESS } = require("../Constants/payment.constant");
const crypto = require("crypto");
const path = require("path");

module.exports.getKeyCotroller = (req, res, next) => {
  try {
    res.status(200).json({
      code: 200,
      success: true,
      message: "api key recieved successfully",
      key: process.env.RAZOPAY_API_KEY,
    });
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};

// order payment gateway
module.exports.checkoutController = async (req, res, next) => {
  try {
    console.log("--");
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit => 500.00
      currency: "INR",
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZOPAY_API_KEY,
      key_secret: process.env.RAZOPAY_API_SECRET,
    });

    const checkout_pay = await razorpay.orders.create(options);
    console.log(checkout_pay);

    res.status(200).json({
      success: true,
      message: ORDER_CREATED_SUCCESS,
      order: checkout_pay,
    });
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};

module.exports.paymentVerificationController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    let x = razorpay_order_id + "|" + razorpay_payment_id;

    generated_signature = crypto
      .createHmac("sha256", process.env.RAZOPAY_API_SECRET)
      .update(x.toString())
      .digest("hex");

    console.log(generated_signature);

    if (generated_signature === razorpay_signature) {
      res.redirect(
        `http://localhost:8000/payment/success?reference=${razorpay_payment_id}`
      );
    } else {
      next(httpError.PaymentRequired("pls doo the payment"));
    }
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};

module.exports.successfullPaymentController = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/success.html"));
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};

module.exports.allPaymentsController = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZOPAY_API_KEY,
      key_secret: process.env.RAZOPAY_API_SECRET,
    });

    const all_payments = await razorpay.payments.all({ count: 50 });
    res.status(200).json({
      code: 200,
      success: true,
      payments: all_payments,
    });
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};

module.exports.allPaymentUI = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/Allpayments.html"));
  } catch (error) {
    next(httpError.InternalServerError(error.message));
  }
};
