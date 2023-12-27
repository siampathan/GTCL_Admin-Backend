const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//connection database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gtcl_db",
});

db.connect((err) => {
  console.log(err ? err : "connected");
});

//fetch data from Database
app.get("/", (req, res) => {
  const data = "SELECT * FROM menu";
  db.query(data, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else return res.json({ data });
  });
});

//insert data in database
app.post("/create", (req, res) => {
  const data = `INSERT INTO menu ( _menu, _parentId, _slug, _sort, _active, _isTitle) VALUES(?)`;
  const values = [...Object.values(req.body)];
  console.log("insert", values);

  db.query(data, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

//get Title
app.get("/title", (req, res) => {
  const parent = "SELECT * FROM menu WHERE _isTitle = 1";
  db.query(parent, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
});

//get Child
app.get("/item/:childId", (req, res) => {
  const id = req.params.childId;
  const parent = "SELECT * FROM menu WHERE _parentId = ?";
  db.query(parent, [id], (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
});

//update Data
app.put("/update/:itemId", (req, res) => {
  const id = req.params.itemId;
  const data = req.body;
  const updateData =
    "UPDATE home SET " +
    Object.keys(data)
      .map((item) => `${item} = ?`)
      .join(",") +
    " WHERE _id = '" +
    id +
    "'";

  db.query(updateData, [...Object.values(data)], (err, out) => {
    if (err) return res.json({ error: err.message });
    else return res.json({ data: out });
  });
});

//delete Data
app.delete("/delete/:itemId", (req, res) => {
  const id = req.params.itemId;
  const data = `DELETE FROM menu WHERE _id = ?`;
  db.query(data, [id], (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
});

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
