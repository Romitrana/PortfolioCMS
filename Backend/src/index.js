const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const connectDB = require("./db/connect");
const UserRouter = require("./routes/users");
const MainRouter = require("./routes/main");
const BlogRouter = require("./routes/blog");
const ProjectRouter = require("./routes/project");
const CommentRouter = require("./routes/comment");
const SkillRouter = require("./routes/skill");
const TestimonialRouter = require("./routes/testimonial");
const CertificateRouter = require("./routes/certificate");
const MailRouter = require("./routes/mail");
// app.use(express.urlencoded())
app.use(express.json());
app.use(cors());

app.use("/portfolio/user", UserRouter);
app.use("/portfolio/main", MainRouter);
app.use("/portfolio/blogs", BlogRouter);
app.use("/portfolio/projects", ProjectRouter);
app.use("/portfolio/comments", CommentRouter);
app.use("/portfolio/skills", SkillRouter);
app.use("/portfolio/testimonials", TestimonialRouter);
app.use("/portfolio/certificates", CertificateRouter);
app.use("/portfolio/contact", MailRouter);

// Start server and DB connection
const start = () => {
  connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log(`Connected to Database... ✅`);
      app.listen(port, () => {
        console.log(`Server is running at port ${port}... ✅`);
      });
    })
    .catch((error) => {
      console.log("Failed to connect");
      console.log(error.message);
    });
};

start();
