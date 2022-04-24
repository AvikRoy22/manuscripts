const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(console.log('connected to mongoose'))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  }, filename: (req, file, cb)=>{
    cb(null, req.body.name)
  }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  res.status(200).json("File Uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute)

app.listen(7000, () => {

  console.log("Backend is running");

})