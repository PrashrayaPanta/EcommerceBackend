const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const brandRoute = express.Router();


const brandCtrl = require("../controller/Brand.js");
const isAdmin = require("../middleware/isAdmin.js");



const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const { deleteOnlyImageHandlerForBrand, getImageDetailsHandlerForBrand} = require("../controller/File.js");


const productRoute = require("./productRoute.js");
const productCtrl = require("../controller/Product.js");






// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nodejsBrandImage",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
  },
});

// Configure Multer for image uploads
const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image, please upload an image"), false);
    }
  },
});


//! Admin

brandRoute.post("/admin/brands", isAuthenticated, isAdmin, upload.single("image"),  brandCtrl.createBrand);



brandRoute.delete("/admin/brands/:id", isAuthenticated, isAdmin, brandCtrl.deleteCertainBrand);


brandRoute.put("/admin/brands/:id", isAuthenticated , isAdmin, upload.single("image"), brandCtrl.EditCertainBrand);

brandRoute.delete("/admin/brands/:id/:whichfolderinside/:filename", isAuthenticated, isAdmin,
  deleteOnlyImageHandlerForBrand
);


brandRoute.get("/admin/brands/:nodejsBrandImage/:filename", isAuthenticated, isAdmin,
  getImageDetailsHandlerForBrand
);


brandRoute.get("/admin/brands", isAuthenticated, isAdmin,   brandCtrl.getAllBrand);






//!FrontEnd Part

brandRoute.get("/brands", brandCtrl.getAllBrand);

brandRoute.get("/brands/:id",  brandCtrl.GetCertainBrand);

productRoute.get("/brands/:id/products", productCtrl. getAllProductByBrandId)













module.exports = brandRoute;

