const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  submitReview,
} = require("../controllers/reviewController");

// Get all reviews
router.get("/reviews", getAllReviews);

// Submit a new review
router.post("/reviews", submitReview);

module.exports = router;
