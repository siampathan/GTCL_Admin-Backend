const express = require("express");
const {
  allData,
  getTitle,
  getChild,
  insertData,
  updateData,
  deleteData,
} = require("../controller/menu");
const router = express.Router();

//get Data
router.route("/").get(allData);
//get Title
router.route("/title").get(getTitle);
//get specific Title
router.route("/item/:childId").get(getChild);

//insert Data
router.route("/create").post(insertData);

//update Data
router.route("/update/:itemId").put(updateData);

//delete Data
router.route("/delete/:itemId").delete(deleteData);

module.exports = router;
