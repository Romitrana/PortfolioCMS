const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const {
  createBlog,
  getSingleBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require("../controllers/blog.js");

router.route("/").get(getAllBlog).post(upload.single("coverImage"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .patch(upload.single("coverImage"), updateBlog)
  .delete(deleteBlog);
router.patch("/:id/like", likeBlog);
router.patch("/:id/dislike", dislikeBlog);
module.exports = router;
