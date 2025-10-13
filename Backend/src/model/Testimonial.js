import mongoose from "mongoose";

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

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
