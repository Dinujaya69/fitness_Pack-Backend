const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");
const User = require("../models/users");

exports.createCheckoutSession = async (req, res) => {
  const { plan, loggedUserId } = req.body;

  if (!plan || plan.length === 0) {
    return res.status(400).json({ error: "No plan found for the user" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: plan.map((item) => ({
        price_data: {
          currency: "lkr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/member/myPlan",
      cancel_url: "http://localhost:3000/home",
    });

    const payment = new Payment({
      paymentId: session.id, // Use session.id instead of session.payment_intent
      amount: session.amount_total / 100, // Convert back to currency units
      currency: session.currency.toUpperCase(),
      paymentMethod: session.payment_method_types[0],
      customerId: loggedUserId,
      planId: plan[0]._id, // Assuming you're only processing one plan at a time
      createdAt: new Date(),
    });
    await payment.save();

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Unable to process payment" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customerId", "-password") // Populate user details except password
      .populate("planId"); // Populate plan details

    res.json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Unable to fetch payments" });
  }
};

exports.getPaymentDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const paymentDetails = await Payment.findOne({ customerId: userId })
      .populate("customerId", "-password")
      .populate("planId");

    if (!paymentDetails) {
      return res.status(404).json({ message: "Payment details not found" });
    }

    res.json(paymentDetails);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLastPayment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lastPayment = await Payment.findOne({ customerId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("planId");

    if (!lastPayment) {
      return res.status(404).json({ message: "No payment found" });
    }

    res.status(200).json(lastPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updatePaymentStatus = async (req, res) => {
  const { paymentId, status } = req.body;

  if (!["pending", "completed", "failed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    res.status(200).json({ message: "Payment status updated successfully" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.getUserWithPlanDetails = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).lean();

    const usersWithPlanDetails = await Promise.all(
      users.map(async (user) => {
        const payment = await Payment.findOne({ customerId: user._id })
          .sort({ createdAt: -1 })
          .populate("planId");

        return {
          ...user,
          planDetails: payment ? payment.planId : null,
        };
      })
    );

    res.json(usersWithPlanDetails);
  } catch (error) {
    console.error("Error fetching users with plan details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deletePayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
