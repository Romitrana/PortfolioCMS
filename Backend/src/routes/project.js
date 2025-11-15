const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // make sure this exists
const {
  createProject,
  getSingleProject,
  getAllProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

// CREATE + GET ALL
router
  .route("/")
  .get(getAllProject)
  .post(upload.single("image"), createProject);

// GET SINGLE + UPDATE + DELETE
router
  .route("/:id")
  .get(getSingleProject)
  .patch(upload.single("image"), updateProject) // ← required
  .delete(deleteProject);

module.exports = router;
