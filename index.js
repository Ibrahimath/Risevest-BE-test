
// packages
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const fileUpload = require("express-fileupload");


const port = process.env.PORT || 3100;
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");


app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 200 * 1024 * 1024 } }));
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "page not found",
  });
});
//sequelize.authenticate().then(
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  })
//);

module.exports = app;
