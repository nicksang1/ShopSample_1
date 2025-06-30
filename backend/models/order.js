const mongoose = require("mongoose");
const orders = new mongoose.Schema(
  {
    buyer_name: String,
    buyer_id: mongoose.Schema.Types.ObjectId,
    items: [
      {
        _id: false,
        product_id: mongoose.Schema.Types.ObjectId,
        product_name: String,
        quantity: Number,
        price: Number,
      },
    ],
    total_price: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", orders);
