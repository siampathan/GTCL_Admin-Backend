const mysql = require("mysql");

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

//get all data
const allData = (req, res) => {
  const data = "SELECT * FROM menu";
  db.query(data, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else return res.json({ data });
  });
};

//insert Data
const insertData = (req, res) => {
  const data = `INSERT INTO menu ( _menu, _parentId, _slug, _sort, _active, _isTitle) VALUES(?)`;
  const values = [...Object.values(req.body)];
  console.log("insert", values);

  db.query(data, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
};

//get Only Title
const getTitle = (req, res) => {
  const parent = "SELECT * FROM menu WHERE _isTitle = 1";
  db.query(parent, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
};

//get Only Child
const getChild = (req, res) => {
  const id = req.params.childId;
  const parent = "SELECT * FROM menu WHERE _parentId = ?";
  db.query(parent, [id], (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
};

//update Data
const updateData = (req, res) => {
  const id = req.params.itemId;
  const data = req.body;
  const updateData =
    "UPDATE menu SET " +
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
};

//delete Data
const deleteData = (req, res) => {
  const id = req.params.itemId;
  const data = `DELETE FROM menu WHERE _id = ?`;
  db.query(data, [id], (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
};

module.exports = {
  allData,
  insertData,
  getTitle,
  getChild,
  updateData,
  deleteData,
};
