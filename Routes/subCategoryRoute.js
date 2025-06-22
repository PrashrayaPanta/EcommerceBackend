const express = require("express");
const reviewCtrl = require("../controller/Review.js");
const isAuthenticated = require("../middleware/isAuth");

const isAdmin = require("../middleware/isAdmin");



const productRoute = require("../Routes/productRoute.js");
const productCtrl = require("../controller/Product.js");
const subCategoryCtrl = require("../controller/SubCategory.js");



const subCategoryRoute = express.Router();

subCategoryRoute.post("/sub-categories", isAuthenticated, isAdmin, subCategoryCtrl.createSubCategory);


subCategoryRoute.get("/sub-categories", isAuthenticated, isAdmin,  subCategoryCtrl.getAllSubCategory);




subCategoryRoute.delete("/sub-categories/:id", isAuthenticated,  isAdmin, subCategoryCtrl.deleteCategoryById);



// Delete account

module.exports = subCategoryRoute;
