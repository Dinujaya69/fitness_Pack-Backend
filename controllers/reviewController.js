// controllers/reviewController.js
const Review = require("../models/review");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a new review
const submitReview = async (req, res) => {
  const { name, email, message, rating } = req.body;

  try {
    const newReview = new Review({
      name,
      email,
      message,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllReviews, submitReview };
