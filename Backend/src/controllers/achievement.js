const fs = require("fs");
const Achievement = require("../model/Achievement.js");
const cloudinary = require("../config/cloudinary.js");

// Create a new achievement
const createAchievement = async (req, res) => {
  try {
    const { title, description, category, dateAwarded } = req.body;
    let imageUrl = "";

    // Handle file upload (if provided)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "achievements",
      });

      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove local temp file
    }

    const achievement = await Achievement.create({
      title,
      description,
      category,
      image: imageUrl || req.body.image, // fallback if image URL passed directly
      dateAwarded,
    });

    res.status(201).json({ success: true, achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single achievement by ID
const getSingleAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement)
      return res.status(404).json({ message: "Achievement not found" });
    res.status(200).json({ success: true, achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an achievement
const updateAchievement = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const updatedData = { title, description, category };

    // Optional: new image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "achievements",
      });
      updatedData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    updatedData.updatedAt = Date.now();

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!achievement)
      return res.status(404).json({ message: "Achievement not found" });

    res.status(200).json({ success: true, achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an achievement
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement)
      return res.status(404).json({ message: "Achievement not found" });
    res
      .status(200)
      .json({ success: true, message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAchievement,
  getSingleAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
};
