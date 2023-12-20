const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_db",
});

db.connect(function (err) {
  console.log(err ? err : "connected");
});

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

//fetch Data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM navbar";
  db.query(sql, (err, data) => {
    if (err) return res.json("error ", err);
    return res.json(data);
  });
});

//Post Data
app.post("/create", upload.single("file"), (req, res) => {
  const sql = "INSERT INTO navbar (`_name`, `_email`, `_image`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.file.filename];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("err", err);
    //return res.json({ data });
    return res.json({ status: "success" });
  });
});

//update Data
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE navbar SET `Name` = ? , `Email` = ? WHERE ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("err", err);
    return res.json(data);
  });
});

//delete Data
app.delete("/navbar/:id", (req, res) => {
  const sql = "DELETE FROM navbar WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("err", err);
    return res.json(data);
  });
});

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
