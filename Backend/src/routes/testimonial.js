const express = require("express");
const router = express.Router();
const {
  createTestimonial,
  getSingleTestimonial,
  getAllTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial");

router.route("/").get(getAllTestimonial).post(createTestimonial);
router
  .route("/:id")
  .get(getSingleTestimonial)
  .patch(updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;
