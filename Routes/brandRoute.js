const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const brandRoute = express.Router();


const brandCtrl = require("../controller/Brand.js");
const isAdmin = require("../middleware/isAdmin.js");



const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const { deleteOnlyImageHandler} = require("../controller/File.js");
// const { getImageByPublicId } = require("../utils/cloudinaryUtils.js");
// const { login } = require("../controller/user.js");





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

brandRoute.post("/", isAuthenticated, isAdmin, upload.single("image"),  brandCtrl.createBrand);



brandRoute.delete("/:id", isAuthenticated, isAdmin, brandCtrl.deleteCertainBrand);


brandRoute.put("/:id", isAuthenticated , isAdmin, upload.single("image"), brandCtrl.EditCertainBrand);



brandRoute.get("/:id",  brandCtrl.GetCertainBrand);


brandRoute.get("/",   brandCtrl.getAllBrand);



brandRoute.delete("/:id/image/:whichfolderinside/:publicId", isAuthenticated, isAdmin,
  deleteOnlyImageHandler 
);



brandRoute.get("/:nodejsBrandImage/image/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params; // Corrected variable name


    const { nodejsBrandImage } = req.params; // Get the nodejsBrand from request parameters


    const publicIDFull = nodejsBrandImage + "/" + public_id; // Combine nodejsBrand and publicId

    console.log(public_id);

    console.log("Fetching details for publicId:", publicIDFull);

    // Fetch image details from Cloudinary
    const result = await cloudinary.api.resource(publicIDFull);

    console.log(result.url);
    

    // console.log("Image details fetched successfully:", result.imageDetails);

    // Send the result back to the client
    res.status(200).json({
      message: "Image details fetched successfully",
      // imageDetails: result,
      url: result.url
    });
  } catch (error) {
    console.error("Error fetching image details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      message: "Failed to fetch image details",
      error: error.message,
    });
  }
});












// brandRoute.get("/",  isAuthenticated,  brandCtrl.getAllbrand);


// brandRoute.get("/:id", isAuthenticated, isAdmin,  brandCtrl.getCertainbrand);



// brandRoute.put("/:id", isAuthenticated, isAdmin, brandCtrl.EditCertainbrand);


// brandRoute.delete("/:id", isAuthenticated, isAdmin, brandCtrl.deleteCertainbrand);


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

module.exports = brandRoute;

