const express = require("express");
const router = express.Router();
const Plan = require("../models/plan");
const upload = require("../config/multerConfig");

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const newPlan = new Plan({
      title,
      price,
      description,
      planImage: req.file.path,
    }); // Assuming Multer saves the file path in req.file.path
    await newPlan.save();
    res.status(200).send("Plan added successfully");
  } catch (err) {
    console.error("Error adding plan:", err);
    res.status(500).send("Error adding plan: " + err.message);
  }
});

// Route to get a plan by ID
router.get("/planid/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    console.log("Fetched Plan:", plan); // Add this console log
    res.json(plan);
  } catch (err) {
    console.error("Error retrieving plan:", err);
    res.status(500).send("Server Error");
  }
});

// Route to edit a plan
router.put("/update/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const updatedPlanData = await Plan.findByIdAndUpdate(planId, req.body, {
      new: true,
    });
    if (!updatedPlanData) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.status(200).json({ status: "Plan updated", plan: updatedPlanData });
  } catch (err) {
    console.error("Error updating plan:", err);
    res.status(500).json({ status: "Error updating plan", error: err.message });
  }
});

// Route to get all plans
router.get("/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    console.error("Error retrieving plans:", err);
    res.status(500).send("Server Error");
  }
});

// Route to get a plan by ID
router.get("/planid/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.json(plan);
  } catch (err) {
    console.error("Error retrieving plan:", err);
    res.status(500).send("Server Error");
  }
});

// Route to delete a plan by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const deletedPlan = await Plan.findByIdAndDelete(planId);
    if (!deletedPlan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.status(200).json({ status: "Plan deleted", plan: deletedPlan });
  } catch (err) {
    console.error("Error deleting plan:", err);
    res.status(500).json({ status: "Error deleting plan", error: err.message });
  }
});

module.exports = router;

// Route to get a plan by ID
router.get("/planid/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    console.log("Fetched Plan:", plan); // Add this console log
    res.json(plan);
  } catch (err) {
    console.error("Error retrieving plan:", err);
    res.status(500).send("Server Error");
  }
});

// Route to edit a plan
router.put("/update/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const updatedPlanData = await Plan.findByIdAndUpdate(planId, req.body, {
      new: true,
    });
    if (!updatedPlanData) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.status(200).json({ status: "Plan updated", plan: updatedPlanData });
  } catch (err) {
    console.error("Error updating plan:", err);
    res.status(500).json({ status: "Error updating plan", error: err.message });
  }
});

// Route to get all plans
router.get("/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    console.error("Error retrieving plans:", err);
    res.status(500).send("Server Error");
  }
});

// Route to get a plan by ID
router.get("/planid/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.json(plan);
  } catch (err) {
    console.error("Error retrieving plan:", err);
    res.status(500).send("Server Error");
  }
});

// Route to delete a plan by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const deletedPlan = await Plan.findByIdAndDelete(planId);
    if (!deletedPlan) {
      return res.status(404).json({ status: "Plan not found" });
    }
    res.status(200).json({ status: "Plan deleted", plan: deletedPlan });
  } catch (err) {
    console.error("Error deleting plan:", err);
    res.status(500).json({ status: "Error deleting plan", error: err.message });
  }
});

module.exports = router;
