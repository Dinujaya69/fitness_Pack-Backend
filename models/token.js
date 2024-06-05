const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Corrected Type to Types
    ref: "User",
    required: true,
    unique: true, // Corrected unque to unique
  },
  token: { type: String, required: true }, // Added missing comma
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token; // Export the Token model
