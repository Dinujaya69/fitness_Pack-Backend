const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Add this line to import Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    verificationCode: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    selectedPlan: {
      type: Schema.Types.ObjectId,
      ref: "Plan", // Reference to the Plan model
    },
  },
  {
    timestamps: true,
  }
);
// Static method to perform aggregation lookup
userSchema.statics.getUserWithPlan = function (userId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "plans", // Collection name in MongoDB
        localField: "selectedPlan",
        foreignField: "_id",
        as: "planDetails",
      },
    },
    { $unwind: "$planDetails" }, // Assuming each user has only one plan
  ]);
};
module.exports = mongoose.model("User", userSchema);
