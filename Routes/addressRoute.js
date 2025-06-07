const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const addressRoute = express.Router();


const addressCtrl = require("../controller/Address.js");
const isAdmin = require("../middleware/isAdmin.js");




//! Admin

addressRoute.post("/", isAuthenticated, addressCtrl.createAddress);


// addressRoute.get("/",  isAuthenticated,  addressCtrl.getAlladdress);


// addressRoute.get("/:id", isAuthenticated, isAdmin,  addressCtrl.getCertainaddress);



// addressRoute.put("/:id", isAuthenticated, isAdmin, addressCtrl.EditCertainaddress);


// categoryRoute.delete("/:id", isAuthenticated, isAdmin, categoryCtrl.deleteCategory);


//! Customer part


// categoryRoute.get("/categories", isAuthenticated, categoryCtrl.getAllCategory);


// categoryRoute.get("/categories/:id", isAuthenticated, categoryCtrl.getCertainCategory)



// categoryRoute.get("/categories/:id/posts", isAuthenticated,  categoryCtrl.getCertainCategoryProducts)



//! Normal Part

// categoryRoute.get("/categories", categoryCtrl.getAllCategory);


// categoryRoute.get("/categories/:id",  categoryCtrl.getCertainCategory)



// categoryRoute.get("/categories/:id/posts", categoryCtrl.getCertainCategoryProducts)




// Route to get category ID by name
// categoryRoute.get("/getCategoryId/:categoryName", categoryCtrl.getCategoryId);

// Example route with missing callback function
// categoryRoute.get("/get", isAuthenticated, isAdmin, categoryCtrl.getCategories);

module.exports = addressRoute;

