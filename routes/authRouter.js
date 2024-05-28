const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../config/multerConfig");

// Define your routes
router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);
router.get(
  "/me",
  upload.single("image"),
  isAuthenticated,
  authController.profile
);

module.exports = router;
