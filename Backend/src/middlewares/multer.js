// const multer = require("multer");
// const path = require("path");

// // store uploads temporarily before sending to Cloudinary
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

// Always store files in backend/uploads regardless of cwd
const uploadPath = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),

  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

module.exports = upload;
