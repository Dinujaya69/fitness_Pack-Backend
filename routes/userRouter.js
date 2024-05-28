// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// const upload = require("../config/multerConfig");

// // Middleware to protect routes if needed

// // Routes
// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getSingleUser);
// router.put("/:id", upload.single("image"), userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// module.exports = router;

// Assuming you have an Express app initialized and connected to your MongoDB

const express = require("express");
const router = express.Router();
const User = require("../models/users"); // Import your User model
const userController = require("../controllers/userController");
const upload = require("../config/multerConfig");

// Route to fetch all users with populated child data
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("selectedPlan.plan_id");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.delete("/:id", userController.deleteUser);
// Update user details and image
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/Images/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
