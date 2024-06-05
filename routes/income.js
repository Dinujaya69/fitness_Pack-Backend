// routes/monthlyIncome.js
const express = require("express");
const router = express.Router();
const monthlyIncomeController = require("../controllers/monthlyIncomeController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get(
  "/monthly-income",
  isAuthenticated,
  isAdmin,
  monthlyIncomeController.getMonthlyIncome
);

module.exports = router;
