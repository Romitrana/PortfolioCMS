const Testimonial = require("../model/Testimonial");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const createTestimonial = async (req, res) => {
  try {
    const { name, role, message, featured } = req.body;
    let photoUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });
      photoUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      message,
      featured,
      photo: photoUrl,
    });

    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Testimonial not found" });

    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, message, featured } = req.body;

    const updatedData = { name, role, message, featured, updatedAt: Date.now() };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });
      updatedData.photo = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Testimonial not found" });

    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Testimonial not found" });

    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTestimonial,
  getSingleTestimonial,
  getAllTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
