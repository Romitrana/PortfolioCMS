const Certificate = require("../model/Certificate");
const cloudinary = require("../config/cloudinary"); // your cloudinary config
const fs = require("fs");

// ✅ Create Certificate
const createCertificate = async (req, res) => {
  try {
    const { title, description, issuer, issueDate } = req.body;
    let imageUrl = "";

    // Upload image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "certificates",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const certificate = await Certificate.create({
      title,
      image: imageUrl,
      description,
      issuer,
      issueDate,
    });

    res.status(201).json({ success: true, certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Certificate
const updateCertificate = async (req, res) => {
  try {
    const { title, description, issuer, issueDate } = req.body;
    const updatedData = { title, description, issuer, issueDate };

    // Handle new image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "certificates",
      });
      updatedData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    updatedData.updatedAt = Date.now();

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!certificate)
      return res.status(404).json({ success: false, message: "Certificate not found" });

    res.status(200).json({ success: true, certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Certificate
const getSingleCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).json({ success: false, message: "Certificate not found" });

    res.status(200).json({ success: true, certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Certificates
const getAllCertificate = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.status(200).json({ success: true, certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Certificate
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate)
      return res.status(404).json({ success: false, message: "Certificate not found" });

    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCertificate,
  getSingleCertificate,
  getAllCertificate,
  updateCertificate,
  deleteCertificate,
};

module.exports = {
  createCertificate,
  getSingleCertificate,
  getAllCertificate,
  updateCertificate,
  deleteCertificate,
};
//add controller for filter in future
