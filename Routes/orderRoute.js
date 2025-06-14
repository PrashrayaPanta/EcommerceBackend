const express = require("express");
const userCtrl = require("../controller/user");
const isAuthenticated = require("../middleware/isAuth");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const isAdmin = require("../middleware/isAdmin");

const orderCtrl = require("../controller/Order");

const orderRoute = express.Router();

orderRoute.post("/create", isAuthenticated,  orderCtrl.createOrder);

orderRoute.get("/", isAuthenticated,  orderCtrl.getAllOrder);

orderRoute.get("/:id", isAuthenticated, orderCtrl.getCertainorder)



orderRoute.delete("/:id", isAuthenticated, isAdmin,  orderCtrl.deleteOrder);

orderRoute.put("/:id", isAuthenticated, isAdmin,  orderCtrl.putOrder);





 
module.exports = orderRoute;
