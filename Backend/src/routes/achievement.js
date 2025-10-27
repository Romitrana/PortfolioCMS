const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const {
 createAchievement,getSingleAchievement,getAllAchievements,updateAchievement,deleteAchievement
} = require("../controllers/achievement.js");

router.route("/").get(getAllAchievements).post(upload.single("image"), createAchievement);
router
  .route("/:id")
  .get(getSingleAchievement)
  .patch(upload.single("coverImage"), updateAchievement)
  .delete(deleteAchievement);

module.exports = router;
