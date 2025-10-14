const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const {
  createBlog,
  getSingleBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.js");

router.route("/").get(getAllBlog).post(upload.single("coverImage"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .patch(upload.single("coverImage"), updateBlog)
  .delete(deleteBlog);

module.exports = router;
