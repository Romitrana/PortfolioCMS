const createTestimonial = (req, res) => {
  res.send("create testimonial");
};
const getSingleTestimonial = (req, res) => {
  res.send("getSingle testimonial");
};
const getAllTestimonial = (req, res) => {
  res.send("get All testimonial");
};
const updateTestimonial = (req, res) => {
  res.send("update testimonial");
};
const deleteTestimonial = (req, res) => {
  res.send("delete testimonial");
};

module.exports = {
  createTestimonial,
  getSingleTestimonial,
  getAllTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
