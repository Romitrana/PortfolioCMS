const express = require("express");
const router = express.Router();
const  sendContactMail  = require("../controllers/mail");

// POST 
router.post("/", sendContactMail);

module.exports = router;