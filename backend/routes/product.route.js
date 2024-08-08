import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// get all products route
router.get("/", getProducts);

// create a product route
router.post("/", createProduct);

// update a product route
router.put("/:id", updateProduct);

// delete a product route
router.delete("/:id", deleteProduct);

export default router;
