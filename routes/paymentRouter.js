const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { isAuthenticated } = require("../middleware/auth"); 


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

// Define the route to fetch the last payment details of the logged-in user
router.get(
  "/myplan/lastpayment",
  isAuthenticated,
  paymentController.getLastPayment
);

module.exports = router;
