const express = require("express");
const router = express.Router();
const {
  createSkill,
  getSingleSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills");

router.route("/").get(getAllSkills).post(createSkill);
router
  .route("/:id")
  .get(getSingleSkill)
  .patch(updateSkill)
  .delete(deleteSkill);

module.exports = router;
