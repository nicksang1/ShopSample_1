const mongoose = require("mongoose");
const products = new mongoose.Schema({
  product_name: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("products", products);
