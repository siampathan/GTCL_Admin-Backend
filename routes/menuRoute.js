const express = require("express");
const {
  allData,
  getTitle,
  getChild,
  insertData,
  updateData,
  deleteData,
} = require("../controller/menuController");
const router = express.Router();

router.route("/").get(allData);
router.route("/title").get(getTitle);
router.route("/item/:childId").get(getChild);
router.route("/create").post(insertData);
router.route("/update/:itemId").put(updateData);
router.route("/delete/:itemId").delete(deleteData);

module.exports = router;
