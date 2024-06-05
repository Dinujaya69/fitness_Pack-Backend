const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const ErrorResponse = require("../utils/errorResponse");

const sendEmail = require("../utils/sendEmail");

// Route for registering members and admins
exports.register = async (req, res) => {
  try {
    const { name, gender, email, password, age, phone, address, selectedPlan } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let role = "member"; // Default role is member
    if (email === "admin@gmail.com") {
      role = "admin"; // Set role to admin if email is admin@gmail.com
    }

    const newUser = new User({
      name,
      gender,
      email,
      password: hashedPassword,
      age,
      phone,
      address,
      selectedPlan,
      image: req.file ? req.file.path : "",
      role,
    });

    await newUser.save();

    // Send registration successful email
    const subject = "Registration Successful";
    const text = `Hello ${name},\n\nYour registration was successful. Welcome to Fitness Pack!\n\nBest regards,\nTeam`;

    await sendEmail(email, subject, text);

    res.status(201).json({
      success: true,
      message: "User registered successfully and email sent.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again later.",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // Include user's role in the token payload
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set token in the browser cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true, // Enable for HTTPS
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    res.status(200).json({
      token: token,
      success: true,
      message: "Successfully logged in",
      data: { user: { ...user._doc, password: undefined }, role: user.role }, // Include user's role in the response data
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",
      error: error.message, // Provide more specific error message for debugging
    });
  }
};
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password") // Exclude the password field
      .populate("selectedPlan.plan_id"); // Populate all fields of the Plan model

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile. Please try again later.",
      error: error.message,
    });
  }
};

// Route for registering trainers
exports.registerTrainer = async (req, res) => {
  try {
    const { name, gender, email, password, age, phone, address, selectedPlan } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Append "tr" to the beginning of the email
    const trainerEmail = "tr" + email;

    const newUser = new User({
      name,
      gender,
      email: trainerEmail, // Save modified email with "tr" prefix
      password: hashedPassword,
      age,
      phone,
      address,
      selectedPlan,
      image: req.file ? req.file.path : "",
      role: "trainer", // Set role to "trainer"
    });

    await newUser.save();

    // Send registration successful email
    const subject = "Registration Successful";
    const text = `Hello ${name},\n\nYour registration as a trainer was successful. Welcome to Fitness Pack!\n\nBest regards,\nTeam
    <p> Your Fitness Pack Trainer Email is : ${trainerEmail} (use for login)`;

    await sendEmail(email, subject, text);

    res.status(201).json({
      success: true,
      message: "Trainer registered successfully and email sent.",
    });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register trainer. Please try again later.",
      error: error.message,
    });
  }
};
