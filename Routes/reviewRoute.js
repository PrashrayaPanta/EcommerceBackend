const express = require("express");
const reviewCtrl = require("../controller/Review.js");
const isAuthenticated = require("../middleware/isAuth");

const isAdmin = require("../middleware/isAdmin");



const productRoute = require("../Routes/productRoute.js");
const productCtrl = require("../controller/Product.js");



const reviewRoute = express.Router();

reviewRoute.post("/reviews", isAuthenticated,  reviewCtrl.createReview);



// Delete account

module.exports = reviewRoute;
