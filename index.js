const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(console.log('connected to mongoose'))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/roy", (req, res) => {
  console.log("Hello")
  console.log("everyone ,  welcome to my  college project")
})
app.listen(7000, () => {

  console.log("Backend is running");

})