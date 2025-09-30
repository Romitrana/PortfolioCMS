const express = require("express");
const router = express.Router();

const { testURL } = require("../controllers/main");

router.route("/maintest").get(testURL);

module.exports = router;
