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

export default allData = (req, res) => {
  const data = "SELECT * FROM menu";
  db.query(data, (err, data) => {
    if (err) return res.json({ err: err.sqlMessage });
    else return res.json({ data });
  });
};
