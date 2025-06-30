var express = require("express");
const productModel = require("../models/product");
var router = express.Router();
const mongoose = require("mongoose");

/* Product API */
// getAll
router.get("/", async function (req, res, next) {
  // res.send('method get');
  try {
    let products = await productModel.find();
    return res.status(200).send({
      data: products,
      message: "Products retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

//getByID
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // Optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).send({
      data: product,
      message: "Product retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

// create
router.post("/", async function (req, res, next) {
  // res.send('method post');
  try {
    const { product_name, price, quantity } = req.body;
    let newProduct = new productModel({
      product_name: product_name,
      price: price,
      quantity: quantity,
    });
    let product = await newProduct.save();
    return res.status(201).send({
      data: product,
      message: "Product created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error creating product " + err,
      success: false,
    });
  }
});

// update
router.put("/:id", async function (req, res, next) {
  // res.send('method put');
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid product id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }
    await productModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );
    let product = await productModel.findById(id);
    return res.status(201).send({
      data: product,
      message: "Product updated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

// delete
router.delete("/:id", async function (req, res, next) {
  // res.send("method delete");
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid product id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }
    await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    let product = await productModel.find();
    return res.status(200).send({
      data: product,
      message: "Delete Product Success",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

module.exports = router;
