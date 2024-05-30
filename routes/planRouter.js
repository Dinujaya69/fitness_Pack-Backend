const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  addPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
  getPlanById,
} = require("../controllers/planController");
const upload = require("../config/multerConfig");

router.post("/add", isAuthenticated, isAdmin, upload.single("image"), addPlan);
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updatePlan
);
router.delete("/delete/:id", isAuthenticated, isAdmin, deletePlan);
router.get("/plans", getAllPlans);
router.get("/planid/:id", getPlanById);

module.exports = router;
