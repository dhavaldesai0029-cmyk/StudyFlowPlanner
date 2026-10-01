const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Subject code is required"],
      trim: true,
    },
    facultyName: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
    },
    totalStudyHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedStudyHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    color: {
      type: String,
      default: "#4f46e5",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
