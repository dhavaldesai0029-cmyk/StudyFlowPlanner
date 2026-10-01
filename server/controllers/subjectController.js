const Subject = require("../models/Subject");
const Task = require("../models/Task");
const StudyPlan = require("../models/StudyPlan");

// @desc    Get all subjects
// @route   GET /api/subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single subject
// @route   GET /api/subjects/:id
exports.getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create subject
// @route   POST /api/subjects
exports.createSubject = async (req, res) => {
  try {
    const { name, code, facultyName, totalStudyHours, color } = req.body;
    if (!name || !code || !facultyName) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, code and facultyName",
      });
    }
    const subject = await Subject.create({
      name,
      code,
      facultyName,
      totalStudyHours: totalStudyHours || 0,
      color,
    });
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete subject (also removes related tasks & study plans)
// @route   DELETE /api/subjects/:id
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    await Task.deleteMany({ subject: subject._id });
    await StudyPlan.deleteMany({ subject: subject._id });
    await subject.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
