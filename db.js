const express = require("express");
const cors = require("cors");
const {
  allData,
  insertData,
  getTitle,
  getChild,
  updateData,
  deleteData,
} = require("./controller/menu");

const app = express();

app.use(express.json());
app.use(cors());

//fetch data from Database
app.get("/", allData);

//insert data in database
app.post("/create", insertData);

//get Title
app.get("/title", getTitle);

//get Child
app.get("/item/:childId", getChild);

//update Data
app.put("/update/:itemId", updateData);

//delete Data
app.delete("/delete/:itemId", deleteData);

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
