const createSkill = async (req, res) => {
  res.send("skill created ");
};
const getSingleSkill = async (req, res) => {
  res.send("get single skill ");
};
const getAllSkills = async (req, res) => {
  res.send("get all skills");
};
const updateSkill = async (req, res) => {
  res.send("update skill");
};
const deleteSkill = async (req, res) => {
  res.send("delete skill");
};

module.exports = {
  createSkill,
  getSingleSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
