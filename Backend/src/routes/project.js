const express = require("express");
const router = express.Router();
const {
  createProject,
  getSingleProject,
  getAllProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.js");

router.route("/").get(getAllProject).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;
