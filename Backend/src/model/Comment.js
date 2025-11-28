const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "targetModel",
  },

  targetModel: {
    type: String,
    required: true,
    enum: ["Project", "Blog"], // allowed models
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  isApproved: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
