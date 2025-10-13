import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String, // main text
    required: true,
    trim: true,
  },
  coverImage: {
    type: String, //blog thumbnail image URL
  },
  tags: [
    {
      type: String, // e.g., ["javascript", "frontend", "career"]
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // references the comment model for blogs
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
