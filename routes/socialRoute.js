const express = require("express");
const {
  getItems,
  createItems,
  updateItems,
} = require("../controller/socialController");
const router = express.Router();

router.route("/").get(getItems);
router.route("/create").post(createItems);
router.route("/update/:itemId").patch(updateItems);
router.route("/delete/:itemId").delete(deleteData);

module.exports = router;
