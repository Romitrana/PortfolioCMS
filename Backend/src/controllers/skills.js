const Skill = require("../model/Skill");

// Create a new skill
const createSkill = async (req, res) => {
  try {
    const {
      name,
      masteredConcepts,
      proficiency,
      experienceYears,
      notes,
      certificates,
      projects,
      tags,
    } = req.body;

    // Check if skill with same name exists
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res
        .status(400)
        .json({ success: false, message: "Skill already exists" });
    }

    const skill = await Skill.create({
      name,
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
      .populate("certificates") // populate certificate details
      .populate("projects"); // populate project details

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

    const updatedData = req.body;

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
