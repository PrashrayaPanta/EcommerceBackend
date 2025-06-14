const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const Product = require("../model/Product.js");

const User = require("../model/User.js");

const File = require("../model/File.js");

const Category = require("../model/Category.js");
const Order = require("../model/Order.js");

const orderCtrl = {
  createOrder: asyncHandler(async (req, res) => {
    console.log("I am inside createPost");
    console.log(req.body);

    // Process items to include product prices
    const processedItems = await Promise.all(
      req.body.map(async (item) => {
        const product = await Product.findById(item.product_id);
        if (!product) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
        return {
          product_id: item.product_id,
          price:
            product.productprice_afterDiscount ||
            product.productprice_beforeDiscount,
          quantity: item.quantity,
        };
      })
    );

    console.log(processedItems);

    const createOrder = await Order.create({
      user_id: req.user_id,
      items: processedItems,
    });

    res.json(createOrder);




    console.log(createOrder);
  }),

  deleteOrder: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    res.json({ message: "succesfully delteed", deleteOrder: order });
  }),

  getAllOrder: asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user_id").populate({
      path: "items.product_id",
      select:
        "product_name product_details productprice_beforeDiscount productprice_afterDiscount images",
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


  getCustomerOrderWithProduct: asyncHandler(async(req, res) =>{

    const orders = await Order.find().populate("user_id");


    console.log(orders);


    



  })
};

module.exports = orderCtrl;
