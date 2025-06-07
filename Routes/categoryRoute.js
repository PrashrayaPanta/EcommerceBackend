const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const categoryRoute = express.Router();


const categoryCtrl = require("../controller/Category.js");
const isAdmin = require("../middleware/isAdmin.js");




//! Admin

categoryRoute.post("/", isAuthenticated, isAdmin,  categoryCtrl.createCategory);


categoryRoute.get("/",  isAuthenticated,  categoryCtrl.getAllCategory);


categoryRoute.get("/:id", isAuthenticated, isAdmin,  categoryCtrl.getCertainCategory);



categoryRoute.put("/:id", isAuthenticated, isAdmin, categoryCtrl.EditCertainCategory);


categoryRoute.delete("/:id", isAuthenticated, isAdmin, categoryCtrl.deleteCategory);


//! Customer part


categoryRoute.get("/categories", isAuthenticated, categoryCtrl.getAllCategory);


categoryRoute.get("/categories/:id", isAuthenticated, categoryCtrl.getCertainCategory)



categoryRoute.get("/categories/:id/posts", isAuthenticated,  categoryCtrl.getCertainCategoryProducts)



//! Normal Part

categoryRoute.get("/frontend/categories", categoryCtrl.getAllCategory);


categoryRoute.get("/frontend/categories/:id",  categoryCtrl.getCertainCategory)



categoryRoute.get("/frontend/categories/:id/products", categoryCtrl.getCertainCategoryProducts)




// Route to get category ID by name
// categoryRoute.get("/getCategoryId/:categoryName", categoryCtrl.getCategoryId);

// Example route with missing callback function
// categoryRoute.get("/get", isAuthenticated, isAdmin, categoryCtrl.getCategories);

module.exports = categoryRoute;

