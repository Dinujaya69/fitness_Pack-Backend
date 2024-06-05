const mongoose = require("mongoose");

const monthlyIncomeSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
  },
  income: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MonthlyIncome = mongoose.model("MonthlyIncome", monthlyIncomeSchema);

module.exports = MonthlyIncome;
