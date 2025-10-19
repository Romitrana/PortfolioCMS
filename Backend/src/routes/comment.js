const express = require("express");
const router = express.Router();

const { addComment,getComment, deleteComment } = require("../controllers/comment.js");

router.route("/").post(addComment);
router.route("/:id").get(getComment).delete(deleteComment);

module.exports = router;
