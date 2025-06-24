const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const Product = require("../model/Product.js");

const User = require("../model/User.js");

const Category = require("../model/Category.js");
const Order = require("../model/Order.js");

const orderCtrl = {
  createOrder: asyncHandler(async (req, res) => {
    console.log("I am inside create Order");

    // Process items to include product prices
    const processedItems = await Promise.all(
      req.body.map(async (item) => {
        const product = await Product.findById(item.product_id);

        if (!product) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
        return {
          product_id: item.product_id,
          price: product.finalPrice,
          quantity: item.quantity,
        };
      })
    );

    // Calculate total quantity and total price
    const totalQuantity = processedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = processedItems.reduce((sum, item) => sum + item.price, 0);

    // Create the order
    const createOrder = await Order.create({
      user_id: req.user_id,
      items: processedItems,
      totalQuantity,
      totalPrice,
    });

    // Find the user and update their orders array
    const userFound = await User.findById(req.user_id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    userFound.orders.push(createOrder._id); // Push the new order ID into the orders array
    await userFound.save();

  
 

    res.json({
      message: "Order created successfully",
      order: createOrder,

    });
  }),

  deleteOrder: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);


    const userFound = await User.findById(req.user_id);


    userFound





    res.json({ message: "succesfully delteed", deleteOrder: order });
  }),

  getAllOrder: asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user_id").populate({
      path: "items.product_id"
    });

    res.json({ orders });
  }),

  getCertainorder: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Order.findById(id); // Populate category_id with the full Category document

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    res.status(200).json({ product });
  }),

  putOrder: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "Failed",
        message:
          "Invalid status. Must be one of: pending, processing, shipped, delivered, cancelled",
      });
    }

    const orderUpdated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // This option returns the updated document
    );

    if (!orderUpdated) {
      return res.status(404).json({
        status: "Failed",
        message: "Order not found",
      });
    }

    res.json({
      status: "Success",
      message: "Order status updated successfully",
      order: orderUpdated,
    });
  }),

  getCustomerOrderWithProduct: asyncHandler(async (req, res) => {
    const orders = await Order.find()
      .populate("user_id", "username email") // Populate user details
  

    console.log(orders);

    res.json({ orders });
  }),
};

module.exports = orderCtrl;
