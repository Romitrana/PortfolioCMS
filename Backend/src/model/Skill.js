const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    masteredConcepts: [{ type: String }],
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    experienceYears: { type: Number, default: 0 },
    notes: { type: String },
    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", SkillSchema);
