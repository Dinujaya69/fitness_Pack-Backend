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
  
  planImage : {
      type: String,
      required: true,
      default: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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
