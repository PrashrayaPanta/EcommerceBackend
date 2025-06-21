const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const categoryRoute = express.Router();





const categoryCtrl = require("../controller/Category.js");



const productCtrl = require("../controller/Product.js")



const productRoute = require("./productRoute.js");


const isAdmin = require("../middleware/isAdmin.js");




//! Admin

categoryRoute.post("/admin/categories", isAuthenticated, isAdmin,  categoryCtrl.createCategory);



categoryRoute.put("/admin/categories/:id", isAuthenticated, isAdmin, categoryCtrl.EditCertainCategory);


categoryRoute.delete("/admin/categories/:id", isAuthenticated, isAdmin, categoryCtrl.deleteCategory);


categoryRoute.get("/admin/categories", isAuthenticated, isAdmin,   categoryCtrl.getAllCategory);






// categoryRoute.get("/:id", isAuthenticated,   categoryCtrl.getCertainCategory);




//! Customer part and //!Normal User


categoryRoute.get("/categories",  categoryCtrl.getAllCategory);



categoryRoute.get("/categories/:id",  categoryCtrl.getCertainCategory);




productRoute.get("/categories/:id/products", productCtrl.getAllProductByCategoryId)



// categoryRoute.get("/frontend/categories/:id/posts",   categoryCtrl.getCertainCategoryProducts)



//! Normal Part

// categoryRoute.get("/frontend/categories", categoryCtrl.getAllCategory);


// categoryRoute.get("/frontend/categories/:id",  categoryCtrl.getCertainCategory)



// categoryRoute.get("/frontend/categories/:id/products", categoryCtrl.getCertainCategoryProducts)




// Route to get category ID by name
// categoryRoute.get("/getCategoryId/:categoryName", categoryCtrl.getCategoryId);

// Example route with missing callback function
// categoryRoute.get("/get", isAuthenticated, isAdmin, categoryCtrl.getCategories);

module.exports = categoryRoute;

