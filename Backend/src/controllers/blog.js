const createBlog = (req, res) => {
  res.send("create blog");
};
const getSingleBlog = (req, res) => {
  res.send("getSingle blog");
};
const getAllBlog = (req, res) => {
  res.send("get All blog");
};
const updateBlog = (req, res) => {
  res.send("update blog");
};
const deleteBlog = (req, res) => {
  res.send("delete blog");
};

module.exports = {
  createBlog,
  getSingleBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
//add controller for filter in future
