const express = require("express");
const router = express.Router();
const {
  createCertificate,
  getSingleCertificate,
  getAllCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificate");

router.route("/").get(getAllCertificate).post(createCertificate);
router
  .route("/:id")
  .get(getSingleCertificate)
  .patch(updateCertificate)
  .delete(deleteCertificate);

module.exports = router;
