const express = require("express");
const {
  getItems,
  getItemsById,
  createItems,
} = require("../controller/contentController");
const router = express.Router();

router.get("/content", getItems);
router.get("/content/:id", getItemsById);
router.post("/content", createItems);

module.exports = router;
