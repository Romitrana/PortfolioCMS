const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: {
    type: [String], // e.g., ["React", "Node.js", "MongoDB"]
    required: true,
  },
  githubLink: {
    type: String,
    trim: true,
  },
  liveDemoLink: {
    type: String,
    trim: true,
  },
  image: {
    type: String, 
  },
  category: {
    type: String, // e.g., "Web App", "Mobile App", "Game"
    default: "General",
  },
  buildDuration: {
    type: Number, //months
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
