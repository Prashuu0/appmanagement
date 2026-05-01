const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assignedTo, deadline, status } = req.body;
    if (!title?.trim() || !projectId || !assignedTo) {
      return res.status(400).json({ message: "Title, projectId, and assignedTo are required" });
    }

    const existingProject = await Project.findOne({ _id: projectId, createdBy: req.user._id });
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!existingProject.members.some((memberId) => memberId.toString() === assignedTo)) {
      return res.status(400).json({ message: "Assignee must be part of the selected project" });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      projectId,
      assignedTo,
      deadline,
      status: ["pending", "in-progress", "completed"].includes(status) ? status : "pending",
      createdBy: req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("projectId", "title");
    return res.status(201).json(populatedTask);
  } catch (error) {
    return next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? { createdBy: req.user._id } : { assignedTo: req.user._id };
    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("projectId", "title")
      .sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssignee = task.assignedTo.toString() === req.user._id.toString();
    if (!isAssignee) {
      return res.status(403).json({ message: "Only assigned member can update this task status" });
    }

    task.status = status;
    await task.save();
    const updated = await Task.findById(task._id).populate("assignedTo", "name email").populate("projectId", "title");
    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAdminOwner = req.user.role === "admin" && task.createdBy.toString() === req.user._id.toString();
    if (!isAdminOwner) {
      return res.status(403).json({ message: "Only task creator admin can delete this task" });
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
