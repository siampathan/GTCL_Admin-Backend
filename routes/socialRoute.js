const express = require("express");
const {
  getItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
} = require("../controller/socialController");
const router = express.Router();

router.get("/items", getItems);
router.get("/items/:id", getItemsById);
router.post("/items", createItems);
router.patch("/items/:id", updateItems);
router.delete("/items/:id", deleteItems);

module.exports = router;
