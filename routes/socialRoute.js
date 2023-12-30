const express = require("express");
const {
  getItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
} = require("../controller/socialController");
const router = express.Router();

router.get("/products", getItems);
router.get("/products/:id", getItemsById);
router.post("/products", createItems);
router.patch("/products/:id", updateItems);
router.delete("/products/:id", deleteItems);

module.exports = router;
