const Subject = require("../models/Subject");
const Task = require("../models/Task");

// @desc    Get dashboard summary stats
// @route   GET /api/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalSubjects = await Subject.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todaysTasks = await Task.find({ dueDate: { $gte: start, $lte: end } })
      .populate("subject", "name code")
      .sort({ dueDate: 1 });

    const progressPercentage =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      success: true,
      data: {
        totalSubjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        progressPercentage,
        todaysTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
