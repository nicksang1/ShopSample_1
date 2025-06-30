var express = require("express");
const orderModels = require("../models/order");
const productModel = require("../models/product");
var router = express.Router();
const mongoose = require("mongoose");
const product = require("../models/product");

/* -------------------------------------------------------------------------- */
/*                                  Order API                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------- // getAll ------------------------------- */
router.get("/", async function (req, res, next) {
  try {
    let orders = await orderModels.find();
    return res.status(200).send({
      data: orders,
      message: "Orders retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

/* -------------------------------- //getByID ------------------------------- */
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // Optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid order ID",
        success: false,
      });
    }

    const order = await orderModels.findById(id);

    if (!order) {
      return res.status(404).send({
        message: "Order not found",
        success: false,
      });
    }

    return res.status(200).send({
      data: order,
      message: "Order retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

/* -------------------------------- // create ------------------------------- */
router.post("/", async function (req, res, next) {
  // res.send('method post');
  try {
    const { buyer_name, buyer_id, items } = req.body;

    // Optional: check if items is an array and not empty
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).send({
        message: "Items must be a non-empty array",
        success: false,
      });
    }

    // Define total_price for calc
    let total_price = 0;
    let product = undefined;
    // Check product availability before proceeding
    for (const item of items) {
      product = await productModel.findById(item.product_id);
      if (!product) {
        return res.status(404).send({
          message: `Product not found: ${item.product_id}`,
          success: false,
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).send({
          message: `Insufficient stock for ${product.product_name}`,
          success: false,
        });
      }
      // Calculate total_price from all items
      total_price += Number(item.quantity) * Number(product.price);

      // Optional: override item.price to match product price (to prevent tampering)
      item.price = product.price;
      item.product_name = product.product_name; // Ensure consistency
      // console.log(total_price);
    }

    const newOrder = new orderModels({
      buyer_name,
      buyer_id,
      items,
      total_price,
    });

    let order = await newOrder.save();

    // Update product stock
    for (const item of items) {
      await productModel.updateOne(
        { _id: item.product_id },
        { $inc: { quantity: -item.quantity } } // subtract stock
      );
    }

    return res.status(201).send({
      data: order.toObject(),
      message: "Order created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error creating order " + err,
      success: false,
    });
  }
});

module.exports = router;
