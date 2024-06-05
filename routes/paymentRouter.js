const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { getUserWithPlanDetails } = require("../controllers/paymentController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get(
  "/payment/details",
  isAuthenticated,
  paymentController.getPaymentDetails
);

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession
);

// Define route to fetch all payments with admin check
router.get(
  "/allpayments",
  isAuthenticated,
  isAdmin,
  paymentController.getAllPayments
);

// Define the route to fetch the last payment details of the logged-in user
router.get(
  "/myplan/lastpayment",
  isAuthenticated,
  paymentController.getLastPayment
);

router.patch(
  "/update-status",
  isAuthenticated,
  isAdmin,
  paymentController.updatePaymentStatus
);

router.get("/users-with-plans", isAuthenticated, getUserWithPlanDetails);


router.delete("/payments/:paymentId", paymentController.deletePayment);
module.exports = router;
