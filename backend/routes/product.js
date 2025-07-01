var express = require("express");
const productModel = require("../models/product");
var router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const path = require("path");

function generateId(req, res, next) {
  req.generatedId = new mongoose.Types.ObjectId(); // keep as ObjectId
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/products";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const id = req.generatedId
      ? req.generatedId.toString()
      : `product-${Date.now()}`;
    cb(null, `${id}${ext}`);
  },
});

const upload = multer({ storage });

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

router.post(
  "/",
  generateId,
  upload.single("picture"),
  async function (req, res) {
    try {
      const { product_name, price, quantity } = req.body;

      const newProduct = new productModel({
        _id: req.generatedId, // use pre-generated ID
        product_name,
        price,
        quantity,
        picture: req.file
          ? `/uploads/products/${req.file.filename}`
          : undefined,
      });

      const saved = await newProduct.save();

      return res.status(201).send({
        data: saved,
        message: "Product created successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error creating product",
        success: false,
        error: error.message,
      });
    }
  }
);

// update
router.put("/:id", upload.single("picture"), async function (req, res, next) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid product id",
        success: false,
      });
    }

    if (req.file) {
      req.body.picture = "/uploads/products/" + req.file.filename;
    }

    await productModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );

    const product = await productModel.findById(id);
    return res.status(200).send({
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
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid product id",
        success: false,
        error: ["ID is not a valid ObjectId"],
      });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
        success: false,
      });
    }

    // ✅ Extract filename from picture path (if it exists)
    if (product.picture) {
      const picturePath = path.join(__dirname, "..", product.picture);

      try {
        if (fs.existsSync(picturePath)) {
          await unlinkAsync(picturePath);
          console.log("Deleted file:", picturePath);
        }
      } catch (err) {
        console.error("Failed to delete image file:", err.message);
      }
    }

    await productModel.deleteOne({ _id: id });

    return res.status(200).send({
      message: "Product and image deleted successfully",
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
