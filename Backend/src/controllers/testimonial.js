const createTestimonial = async (req, res) => {
  res.send("create testimonial");
};
const getSingleTestimonial = async (req, res) => {
  res.send("getSingle testimonial");
};
const getAllTestimonial = async (req, res) => {
  res.send("get All testimonial");
};
const updateTestimonial = async (req, res) => {
  res.send("update testimonial");
};
const deleteTestimonial = async (req, res) => {
  res.send("delete testimonial");
};

module.exports = {
  createTestimonial,
  getSingleTestimonial,
  getAllTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
