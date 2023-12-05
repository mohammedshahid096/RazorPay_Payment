const express = require("express");
const Routes = express.Router();
const {
  checkoutController,
  paymentVerificationController,
  getKeyCotroller,
  allPaymentsController,
} = require("../Controllers/payment.controller");

Routes.route("/order").post(checkoutController);
Routes.route("/verify").post(paymentVerificationController);
Routes.route("/getkey").get(getKeyCotroller);
Routes.route("/all-payments").get(allPaymentsController);

module.exports = Routes;
