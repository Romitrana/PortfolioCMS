const addComment = async (req, res) => {
  res.send("Add comment");
};
const getComment = async (req, res) => {
  res.send("get comment");
};
const deleteComment = async (req, res) => {
  res.send("delete comment");
};

module.exports = { addComment, getComment, deleteComment };
