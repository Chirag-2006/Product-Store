import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Products fetched", data: products });
  } catch (error) {
    console.error("Error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Validate the required fields
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Create the product in the database
    const product = await Product.create(req.body);

    // Send a success response
    res
      .status(201)
      .json({
        success: true,
        message: "Product created Successfully",
        data: product,
      });
  } catch (error) {
    console.error("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  // Get the id from the params
  const { id } = req.params;
  const product = req.body;

  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    // Find the product by id and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Product updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  // Get the id from the params
  const { id } = req.params;

  // if product is not found
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    // Find the product by id
    const product = await Product.findById(id);

    // Delete the product
    await Product.deleteOne({ _id: id });

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
