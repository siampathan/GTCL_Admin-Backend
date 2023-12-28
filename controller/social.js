const mysql = require("mysql");

//connection database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gtcl_db",
});

// db.connect((err) => {
//   console.log(err ? err : "connected");
// });

//get all data
const allData = (req, res) => {
  const data = "SELECT * FROM social_info";
  db.query(data, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else return res.json({ data });
  });
};

//insert Data
const insertData = (req, res) => {
  const data = `INSERT INTO social_info ( _title, _icon, _link) VALUES(?)`;
  const values = [...Object.values(req.body)];
  console.log("insert", values);

  db.query(data, [values], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
};

//update Data update
const updateData = (req, res) => {
  const id = req.params.itemId;
  const data = req.body;
  const updateData =
    "UPDATE social_info SET " +
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
  const data = `DELETE FROM social_info WHERE _id = ?`;
  db.query(data, [id], (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else res.json({ data });
  });
};

module.exports = { allData, insertData, updateData, deleteData };
