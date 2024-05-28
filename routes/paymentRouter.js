const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { isAuthenticated } = require("../middleware/auth"); // Remove extra space

router.get(
  "/payment/details",
  isAuthenticated,
  paymentController.getPaymentDetails
);

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession
);

// Define route to fetch all payments
router.get("/allpayments", paymentController.getAllPayments);

module.exports = router;
