const express = require("express");

const productCtrl = require("../controller/Product.js");

const isAuthenticated = require("../middleware/isAuth");

const productRoute = express.Router();



const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const isAdmin = require("../middleware/isAdmin.js");


const { deleteOnlyImageHandler, getImageDetailsHandlerForProduct, deleteImageHandlerForProduct} = require("../controller/File.js");


const cloudinary = require("cloudinary").v2;

//! Configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//!Configure multer storage cloudinary for image

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nodejsproductImages",
    allowedFormat: ["png", "jpeg"],
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
  },
});

///!Configure Multer for uploading image

const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, //5MB LIMIt
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image plz upload an image", false));
    }
  },
});




productRoute.post(
  "/admin/products",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  productCtrl.createProduct
);


productRoute.get("/admin/:nodejsProductImages/:filename", 
  getImageDetailsHandlerForProduct
);



productRoute.delete("/products/:id/:nodejsProductImages/:filename", 
  deleteImageHandlerForProduct
);


// productRoute.get("/frontend/latestproducts", )




productRoute.put("/admin/products/:id", isAuthenticated, isAdmin, upload.array("images"), productCtrl.updateCertainproduct);


// productRoute.get("/:categoryName", isAuthenticated, isAdmin,  productCtrl.getAllProductsByCategoryName);

// productRoute.get("/latestproduct", isAuthenticated, isAdmin, productCtrl.Latestproducts);

// productRoute.get("/search",  isAuthenticated, isAdmin,  productCtrl.searchproduct);



// productRoute.get("/:id", isAuthenticated, isAdmin, productCtrl.getCertainproduct);

productRoute.delete("/admin/products/:id", isAuthenticated, isAdmin, productCtrl.deleteproduct);



// productRoute.get("/latestproduct", isAuthenticated,  productCtrl.Latestproducts);

// productRoute.get("/search",  isAuthenticated,  productCtrl.searchproduct);





productRoute.post("/products/:id/reviews", isAuthenticated, productCtrl.createCertainProductReviews);


// productCtrl.get("/cms/reviews", isAuthenticated, isAdmin, )



//!FrontEnd Part



productRoute.get("/admin/products", isAuthenticated, isAdmin, productCtrl.getAllproduct);


productRoute.get("/products/Latestproducts", productCtrl.Latestproducts);


productRoute.get("/products/search", productCtrl.searchProduct)


productRoute.get("/products/:id", productCtrl.getCertainproduct)

//! Top Latest Product







// productRoute.get("/frontend/brands/:slug/products", productCtrl.getAllProductByBrandId )



module.exports = productRoute;
