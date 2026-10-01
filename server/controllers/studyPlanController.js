const StudyPlan = require("../models/StudyPlan");

// @desc    Get all study plans (supports ?date=&subject=)
// @route   GET /api/studyplans
exports.getStudyPlans = async (req, res) => {
  try {
    const { date, subject } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }
    const plans = await StudyPlan.find(query)
      .populate("subject", "name code")
      .sort({ date: 1, startTime: 1 });
    res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single study plan
// @route   GET /api/studyplans/:id
exports.getStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id).populate("subject", "name code");
    if (!plan) {
      return res.status(404).json({ success: false, message: "Study plan not found" });
    }
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create study plan
// @route   POST /api/studyplans
exports.createStudyPlan = async (req, res) => {
  try {
    const { subject, date, startTime, endTime, topic } = req.body;
    if (!subject || !date || !startTime || !endTime || !topic) {
      return res.status(400).json({
        success: false,
        message: "Please provide subject, date, startTime, endTime and topic",
      });
    }
    const plan = await StudyPlan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update study plan
// @route   PUT /api/studyplans/:id
exports.updateStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res.status(404).json({ success: false, message: "Study plan not found" });
    }
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete study plan
// @route   DELETE /api/studyplans/:id
exports.deleteStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Study plan not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
