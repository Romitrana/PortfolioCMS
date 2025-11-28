const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // path to your multer config

const {
  createSkill,
  getSingleSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills");

// For create & update, we expect an optional image file in field "image"
router.route("/").get(getAllSkills).post(upload.single("image"), createSkill);

router
  .route("/:id")
  .get(getSingleSkill)
  .patch(upload.single("image"), updateSkill)
  .delete(deleteSkill);

module.exports = router;
