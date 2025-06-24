const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
