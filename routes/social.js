const express = require("express");
const {
  allData,
  insertData,
  updateData,
  deleteData,
} = require("../controller/social");
const router = express.Router();

router.route("/").get(allData);
router.route("/create").post(insertData);
router.route("/update/:itemId").put(updateData);
router.route("/delete/:itemId").delete(deleteData);

module.exports = router;
