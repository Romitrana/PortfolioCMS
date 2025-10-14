const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true, // e.g., "Client", "Colleague", "Mentor"
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, // URL or filename of the person's photo
  },
  featured: {
    type: Boolean,
    default: false, // can mark some testimonials as featured
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);

