const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  planImage: {
    type: String,
  },
  description: {
    type: [String],
    required: true,
  },
  selectedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
