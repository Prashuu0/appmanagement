const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res, next) => {
  try {
    const { title, description, members = [] } = req.body;
    if (!title?.trim()) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const project = await Project.create({
      title: title.trim(),
      description,
      createdBy: req.user._id,
      members: [...new Set([req.user._id.toString(), ...members])],
    });

    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const query =
      req.user.role === "admin"
        ? { createdBy: req.user._id }
        : { members: { $in: [req.user._id] } };

    const projects = await Project.find(query)
      .populate("members", "name email role")
      .sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
};

const addMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findOne({ _id: id, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const alreadyMember = project.members.some((memberId) => memberId.toString() === userId);
    if (!alreadyMember) {
      project.members.push(userId);
      await project.save();
    }

    const updated = await Project.findById(id).populate("members", "name email role");
    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

const removeMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const project = await Project.findOne({ _id: id, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.createdBy.toString() === userId) {
      return res.status(400).json({ message: "Project owner cannot be removed from members" });
    }

    project.members = project.members.filter((memberId) => memberId.toString() !== userId);
    await project.save();
    const updated = await Project.findById(id).populate("members", "name email role");
    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createProject, getProjects, addMember, removeMember };
