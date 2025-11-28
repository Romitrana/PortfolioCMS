const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer"); // adjust path to your multer config

const {
  createTestimonial,
  getSingleTestimonial,
  getAllTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial");

// GET all + CREATE new (with optional photo)
router
  .route("/")
  .get(getAllTestimonial)
  .post(upload.single("photo"), createTestimonial);

// GET one + UPDATE (with optional new photo) + DELETE
router
  .route("/:id")
  .get(getSingleTestimonial)
  .patch(upload.single("photo"), updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;
