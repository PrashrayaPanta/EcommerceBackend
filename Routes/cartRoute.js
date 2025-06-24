const express = require("express");

const isAuthenticated = require("../middleware/isAuth.js");

const isAdmin = require("../middleware/isAdmin");




const cartCtrl = require("../controller/Cart.js");



const cartRoute = express.Router();

cartRoute.post("/cart", isAuthenticated,  cartCtrl.createCart);



// Delete account

module.exports = cartRoute;
