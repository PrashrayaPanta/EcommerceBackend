const express = require("express");
const reviewCtrl = require("../controller/Review.js");
const isAuthenticated = require("../middleware/isAuth");

const isAdmin = require("../middleware/isAdmin");







const reviewRoute = express.Router();

reviewRoute.get("/", isAuthenticated,  reviewCtrl.getReview);



// Delete account

module.exports = reviewRoute;
