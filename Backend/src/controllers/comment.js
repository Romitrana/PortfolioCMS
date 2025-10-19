const Comment = require("../model/Comment");
const Project = require("../model/Project");

//  Add a comment to a project
const addComment = async (req, res) => {
  try {
    const { project, name, message } = req.body;

    // Validate required fields
    if (!project || !name || !message) {
      return res.status(400).json({ message: "Project, name, and message are required" });
    }

    // Optional: check if project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const comment = await Comment.create({ project, name, message });
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get all comments for a project
const getComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const comments = await Comment.find({ project: id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addComment, getComment, deleteComment };
