const Skill = require("../model/Skill");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Create a new skill
const createSkill = async (req, res) => {
  try {
    const {
      name,
      description,
      masteredConcepts,
      proficiency,
      experienceYears,
      notes,
      certificates,
      projects,
      tags,
    } = req.body;

    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res
        .status(400)
        .json({ success: false, message: "Skill already exists" });
    }

    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const skill = await Skill.create({
      name,
      description,
      image: imageUrl,
      masteredConcepts,
      proficiency,
      experienceYears,
      notes,
      certificates,
      projects,
      tags,
    });

    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single skill by ID
const getSingleSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id)
      .populate("certificates")
      .populate("projects");

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate("certificates")
      .populate("projects")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a skill by ID
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      masteredConcepts,
      proficiency,
      experienceYears,
      notes,
      certificates,
      projects,
      tags,
    } = req.body;

    const updatedData = {
      name,
      description,
      masteredConcepts,
      proficiency,
      experienceYears,
      notes,
      certificates,
      projects,
      tags,
      updatedAt: Date.now(),
    };

    // Upload new image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });
      updatedData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const skill = await Skill.findByIdAndUpdate(id, updatedData, { new: true })
      .populate("certificates")
      .populate("projects");

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a skill by ID
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSkill,
  getSingleSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
