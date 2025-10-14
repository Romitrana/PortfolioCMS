const express = require("express");
const router = express.Router();

const { addComment,getComment, deleteComment } = require("../controllers/comment.js");

router.route("/").get(getComment).post(addComment);
router.route("/:id").delete(deleteComment);

module.exports = router;
