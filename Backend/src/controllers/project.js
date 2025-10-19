const Project = require("../model/Project");
const cloudinary = require("../config/cloudinary"); // make sure your path matches
const fs = require("fs");

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubLink,
      liveDemoLink,
      category,
      buildDuration,
      featured,
    } = req.body;

    let imageUrl = "";

    // ✅ Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    // ✅ Handle technologies input (supports both string & array)
    let techList = [];
    if (typeof technologies === "string") {
      techList = technologies.split(",").map((t) => t.trim());
    } else if (Array.isArray(technologies)) {
      techList = technologies;
    }

    // ✅ Create new project
    const project = await Project.create({
      title,
      description,
      technologies: techList,
      githubLink,
      liveDemoLink,
      image: imageUrl,
      category,
      buildDuration,
      featured,
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      technologies,
      githubLink,
      liveDemoLink,
      category,
      buildDuration,
      featured,
    } = req.body;

    // Handle technologies input (string or array)
    let techList = [];
    if (typeof technologies === "string") {
      techList = technologies.split(",").map((t) => t.trim());
    } else if (Array.isArray(technologies)) {
      techList = technologies;
    }

    const updatedData = {
      title,
      description,
      technologies: techList,
      githubLink,
      liveDemoLink,
      category,
      buildDuration,
      featured,
      updatedAt: Date.now(),
    };

    // Upload new image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      updatedData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const project = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createProject,
  getSingleProject,
  getAllProject,
  updateProject,
  deleteProject,
};
