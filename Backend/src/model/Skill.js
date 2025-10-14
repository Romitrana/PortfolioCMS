const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    masteredConcepts: [{ type: String }],
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    experienceYears: { type: Number, default: 0 },
    notes: { type: String }, // for personal remarks

    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }], // Optional certificates
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }], // Optional projects

    tags: [{ type: String }], // e.g., ["frontend", "backend", "database"]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", SkillSchema);
