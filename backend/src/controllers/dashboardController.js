const Task = require("../models/Task");

const getDashboardStats = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? { createdBy: req.user._id } : { assignedTo: req.user._id };
    const tasks = await Task.find(query);
    const now = new Date();

    const stats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.status === "completed").length,
      pendingTasks: tasks.filter((t) => t.status === "pending").length,
      inProgressTasks: tasks.filter((t) => t.status === "in-progress").length,
      overdueTasks: tasks.filter((t) => t.deadline && t.status !== "completed" && new Date(t.deadline) < now).length,
    };

    return res.status(200).json(stats);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboardStats };
