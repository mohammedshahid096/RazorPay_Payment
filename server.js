const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const Razorpay = require("razorpay");
const paymentRoutes = require("./Routes/payment.routes");
const {
  successfullPaymentController,
  allPaymentUI,
} = require("./Controllers/payment.controller");

dotenv.config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/", express.static(path.join(__dirname, "public")));

// TODO : index routes file is placed here
app.use("/api/v1/payment/", paymentRoutes);
app.use("/payment/success", successfullPaymentController);
app.use("/payment/all", allPaymentUI);

app.use("*", (req, res) => {
  res.status(404).json({
    code: 404,
    message: "No Route is available with the given URL",
  });
});

// TODO for response error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status,
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT || 8001, () => {
  console.log("server is runnin on " + process.env.PORT || 8001);
});
