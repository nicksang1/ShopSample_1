const mongoose = require("mongoose");
const products = new mongoose.Schema({
  product_name: String,
  price: Number,
  quantity: Number,
  picture: {
    type: String, // path to img in ./upload/..
    default: "",
  },
});

module.exports = mongoose.model("products", products);
