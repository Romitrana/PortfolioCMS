const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // your multer config

const {
  createCertificate,
  getSingleCertificate,
  getAllCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificate");

router
  .route("/")
  .get(getAllCertificate)
  .post(upload.single("image"), createCertificate);

router
  .route("/:id")
  .get(getSingleCertificate)
  .patch(upload.single("image"), updateCertificate)
  .delete(deleteCertificate);

module.exports = router;
