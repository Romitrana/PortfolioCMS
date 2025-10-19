const mongoose = require("mongoose");
const { Schema } = mongoose;

const CertificateSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String }, // URL or path to certificate image
    description: { type: String },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
