const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoute");
const socialRoutes = require("./routes/socialRoute");
const contentRoutes = require("./routes/contentRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(FileUpload());
app.use(express.static("public"));

app.use("/header", menuRoutes);
app.use("/social", socialRoutes);
app.use("/section", contentRoutes);

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
