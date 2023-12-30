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
router.route("/title/:childId").get(getChild);
router.route("/title").post(insertData);
router.route("/title/:itemId").put(updateData);
router.route("/title/:itemId").delete(deleteData);

module.exports = router;
