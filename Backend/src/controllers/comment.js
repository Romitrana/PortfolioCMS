const addComment = (req, res) => {
  res.send("Add comment");
};
const deleteComment = (req, res) => {
  res.send("delete comment");
};

module.exports = { addComment, deleteComment };
