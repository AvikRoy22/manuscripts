const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const imageRoute = require("./routes/images");
const reportRoute = require("./routes/reports");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");

dotenv.config();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(console.log('connected to mongoose'))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/images", imageRoute);
app.use("/api/reports", reportRoute);

app.get("/", (req, resp) =>{
  resp.send("Server Running")
})

app.listen(process.env.PORT, () => {
  console.log("Backend is running");
})