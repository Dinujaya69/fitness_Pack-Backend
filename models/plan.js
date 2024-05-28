const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
   selectedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
