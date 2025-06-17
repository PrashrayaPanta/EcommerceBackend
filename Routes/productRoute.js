const express = require("express");

const productCtrl = require("../controller/Product.js");

const isAuthenticated = require("../middleware/isAuth");

const productRoute = express.Router();



const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const isAdmin = require("../middleware/isAdmin.js");

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
  "/",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  productCtrl.createProduct
);



productRoute.put("/:id", isAuthenticated, isAdmin, productCtrl.updateCertainproduct);


productRoute.get("/:categoryName", isAuthenticated, isAdmin,  productCtrl.getAllProductsByCategoryName);

productRoute.get("/latestproduct", isAuthenticated, isAdmin, productCtrl.Latestproducts);

productRoute.get("/search",  isAuthenticated, isAdmin,  productCtrl.searchproduct);



productRoute.get("/:id", isAuthenticated, isAdmin, productCtrl.getCertainproduct);

productRoute.delete("/:id", isAuthenticated, isAdmin, productCtrl.deleteproduct);



productRoute.get("/latestproduct", isAuthenticated,  productCtrl.Latestproducts);

productRoute.get("/search",  isAuthenticated,  productCtrl.searchproduct);


productRoute.get("/:id", isAuthenticated, productCtrl.getCertainproduct);


productRoute.get("/", isAuthenticated,   productCtrl.getAllproduct);


productRoute.post("/:id/reviews", productCtrl.createCertainProductReviews)



//!FrontEnd Part
productRoute.get("/frontend/products", productCtrl.getAllproduct);


productRoute.get("/frontend/products/:id", productCtrl.getCertainproduct);

productRoute.get("/search",  productCtrl.searchproduct);

productRoute.get("/:id", productCtrl.getCertainproduct);

productRoute.get("/frontend/products/:id/category", productCtrl.getCertainproductCategory);


productRoute.get("/latestproduct",  productCtrl.Latestproducts);

productRoute.get("/frontend/categories/:id/products", productCtrl.getAllProductByCategoryId)


productRoute.get("/frontend/brands/:slug/products", productCtrl.getAllProductByBrandId )



module.exports = productRoute;
