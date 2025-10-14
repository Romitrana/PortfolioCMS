const createCertificate = async (req, res) => {
  res.send("create certificate");
};
const getSingleCertificate = async (req, res) => {
  res.send("getSingle certificate");
};
const getAllCertificate = async (req, res) => {
  res.send("get All certificate");
};
const updateCertificate = async (req, res) => {
  res.send("update certificate");
};
const deleteCertificate = async (req, res) => {
  res.send("delete certificate");
};

module.exports = {
  createCertificate,
  getSingleCertificate,
  getAllCertificate,
  updateCertificate,
  deleteCertificate,
};
//add controller for filter in future
