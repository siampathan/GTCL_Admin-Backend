const express = require("express");
const cors = require("cors");
const header_routes = require("./routes/menu");
const socialInfo_routes = require("./routes/social");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/uploadimage", (req, res) => {
  res.send("It's Work");
});

app.post("/uploadimage", upload.single("image"), (req, res) => {
  res.send("Image Upload");
});

app.use("/header", header_routes);
app.use("/social", socialInfo_routes);

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
