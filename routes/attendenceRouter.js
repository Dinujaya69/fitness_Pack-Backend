const express = require("express");
const mongoose = require("mongoose");
const Attendance = require("../models/attendance"); 
const User = require("../models/users"); 
const router = express.Router();

// Middleware to handle async route handlers and errors
const asyncHandler = require("express-async-handler");

// Create Attendance
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, date } = req.body;
    const attendance = new Attendance({ userId, date });
    await attendance.save();
    res.status(201).json(attendance);
  })
);

// Get All Attendances with User Details
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const attendances = await Attendance.find().populate("userId");
    res.status(200).json(attendances);
  })
);

// Get Single Attendance
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id).populate(
      "userId"
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  })
);

// Update Attendance
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { userId, date } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { userId, date },
      { new: true, runValidators: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  })
);

// Delete Attendance
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance deleted" });
  })
);

module.exports = router;
