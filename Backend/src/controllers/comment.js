const Comment = require("../model/Comment");
const Project = require("../model/Project");
const Blog = require("../model/Blog");

// Add a comment to a project or blog
const addComment = async (req, res) => {
  try {
    const { targetId, targetModel, name, message } = req.body;

    // Validate required fields
    if (!targetId || !targetModel || !name || !message) {
      return res.status(400).json({
        message: "targetId, targetModel, name, and message are required",
      });
    }

    // Validate model
    if (!["Project", "Blog"].includes(targetModel)) {
      return res.status(400).json({ message: "Invalid targetModel" });
    }

    // Pick correct model dynamically
    const Model = targetModel === "Project" ? Project : Blog;
    const target = await Model.findById(targetId);

    if (!target) {
      return res.status(404).json({ message: `${targetModel} not found` });
    }

    // Create comment
    const comment = await Comment.create({
      targetId,
      targetModel,
      name,
      message,
    });

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get comments for project OR blog
const getComment = async (req, res) => {
  try {
    const { id } = req.params; // targetId
    const { model } = req.query; // "Project" or "Blog"

    if (!model || !["Project", "Blog"].includes(model)) {
      return res.status(400).json({ message: "Invalid or missing model" });
    }

    const Model = model === "Project" ? Project : Blog;
    const exists = await Model.findById(id);

    if (!exists) {
      return res.status(404).json({ message: `${model} not found` });
    }

    const comments = await Comment.find({
      targetId: id,
      targetModel: model,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addComment, getComment, deleteComment };
