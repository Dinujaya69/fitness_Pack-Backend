const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ filePath: `/images/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
