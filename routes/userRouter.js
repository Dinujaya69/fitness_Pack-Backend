const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../config/multerConfig");

// Get all users
router.get("/users", userController.getAllUsers);

// Delete a user
router.delete("/:id", userController.deleteUser);

// Update a user
router.put("/:id", userController.updateUser);

// Route to get member count
router.get("/member-count", userController.getMemberCount);

// Route to get Trainer count
router.get("/trainer-count", userController.getTrainerCount);

// Route to get plan count
router.get("/plan-count", userController.getPlanCount);

// Route to get total amount of payments
router.get("/total-payments", userController.getTotalPayments);

router.get("/trainers", userController.getAllTrainers);

module.exports = router;
