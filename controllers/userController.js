const User = require("../models/users");
const Plan = require("../models/plan");
const Payment = require("../models/payment");

// Delete a user
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Deleted user:", deletedUser);

    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("selectedPlan.plan_id");

    console.log("Fetched users:", users);

    res.status(200).json({
      success: true,
      count: users.length,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    let updateData = req.body;
    // Check if image is uploaded
    if (req.file) {
      updateData.image = req.file.path; // Save new image path
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Updated user:", updatedUser);

    res.status(200).json({
      success: true,
      message: "User successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// Get member count
exports.getMemberCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "member" });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
// Get trainer count
exports.getTrainerCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "trainer" });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get plan count
exports.getPlanCount = async (req, res) => {
  try {
    const count = await Plan.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get total amount of payments
exports.getTotalPayments = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalAmount = payments[0]?.totalAmount || 0;
    res.status(200).json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer" }).populate("selectedPlan");

    console.log("Fetched trainers:", trainers);

    res.status(200).json({
      success: true,
      count: trainers.length,
      message: "Trainers retrieved successfully",
      data: trainers,
    });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve trainers",
    });
  }
};




