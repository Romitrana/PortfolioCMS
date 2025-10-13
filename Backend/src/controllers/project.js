const createProject = (req, res) => {
  res.send("create project");
};
const getSingleProject = (req, res) => {
  res.send("getSingle project");
};
const getAllProject = (req, res) => {
  res.send("get All projects");
};
const updateProject = (req, res) => {
  res.send("update project");
};
const deleteProject = (req, res) => {
  res.send("delete project");
};

module.exports = {
  createProject,
  getSingleProject,
  getAllProject,
  updateProject,
  deleteProject,
};
