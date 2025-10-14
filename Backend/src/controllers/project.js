const createProject = async (req, res) => {
  res.send("create project");
};
const getSingleProject = async (req, res) => {
  res.send("getSingle project");
};
const getAllProject = async (req, res) => {
  res.send("get All projects");
};
const updateProject = async (req, res) => {
  res.send("update project");
};
const deleteProject = async (req, res) => {
  res.send("delete project");
};

module.exports = {
  createProject,
  getSingleProject,
  getAllProject,
  updateProject,
  deleteProject,
};
