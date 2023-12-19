const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_db",
});

//fetch Data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM navbar";
  db.query(sql, (err, data) => {
    if (err) return res.json("error ", err);
    return res.json(data);
  });
});

//Post Data
app.post("/create", (req, res) => {
  const sql = "INSERT INTO navbar (`Name`, `Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("err", err);
    return res.json(data);
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
