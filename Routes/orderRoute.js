const express = require("express");
const userCtrl = require("../controller/user");
const isAuthenticated = require("../middleware/isAuth");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const isAdmin = require("../middleware/isAdmin");

const orderCtrl = require("../controller/Order");

const orderRoute = express.Router();

orderRoute.post("/orders", isAuthenticated,  orderCtrl.createOrder);


orderRoute.get("/orders", isAuthenticated,   orderCtrl.getAllOrder);


orderRoute.get("/customer", isAuthenticated, orderCtrl. getCustomerOrderWithProduct)

orderRoute.get("/orders/:id", isAuthenticated, orderCtrl.getCertainorder)


orderRoute.delete("/orders/:id", isAuthenticated, orderCtrl.deleteOrder);

orderRoute.put("/orders/:id", isAuthenticated, isAdmin,  orderCtrl.putOrder);


 
module.exports = orderRoute;
