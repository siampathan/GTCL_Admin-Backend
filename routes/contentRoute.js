const express = require("express");
const {
  getItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
} = require("../controller/contentController");
const router = express.Router();

router.get("/content", getItems);
router.get("/content/:id", getItemsById);
router.post("/content", createItems);
router.patch("/content/:id", updateItems);
router.delete("/content/:id", deleteItems);

module.exports = router;
