const Payment = require("../models/payment");

exports.getMonthlyIncome = async (req, res) => {
  try {
    const monthlyIncomeData = await Payment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          income: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(monthlyIncomeData);
  } catch (error) {
    console.error("Error fetching monthly income data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
