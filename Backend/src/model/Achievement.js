const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // URL or file path for thumbnail
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  dateAwarded: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true })


module.exports = mongoose.model("Achievement", achievementSchema);
