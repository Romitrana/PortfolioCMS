const express = require("express");
const router = express.Router();
const { testURL, login,logout, register } = require("../controllers/users");

router.route("/usertest").get(testURL);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/signup").post(register)

module.exports = router;
