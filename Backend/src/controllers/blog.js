const fs = require("fs");
const Blog = require("../model/Blog.js");
const cloudinary = require("../config/cloudinary.js");

const createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    let imageUrl = "";

    // If an image file was uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete temp file
    }

    const blog = await Blog.create({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      coverImage: imageUrl,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updatedData = { title, content, tags: tags ? tags.split(",") : [] };

    // Optional: handle new cover image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      updatedData.coverImage = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    updatedData.updatedAt = Date.now();

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getSingleBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
//add controller for filter in future
