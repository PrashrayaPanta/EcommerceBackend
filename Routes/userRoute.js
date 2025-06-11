const express = require("express");
const userCtrl = require("../controller/user");
const isAuthenticated = require("../middleware/isAuth");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const isAdmin = require("../middleware/isAdmin");

// console.log("I am inside the userroute")

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
    folder: "userProfileImage",
    allowedFormat: ["png", "jpeg"],
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

const userRoute = express.Router();

userRoute.post("/register", upload.single("image"), userCtrl.register);
userRoute.post("/login", userCtrl.login); // Login

//! Admin  Route



userRoute.get("/profile", isAuthenticated,   userCtrl.Profile);
userRoute.put(
  "/profile/edit",
  isAuthenticated,
  // isAdmin,
  userCtrl.EditProfile
); // Edit profile

userRoute.put(
  "/profile/password",
  isAuthenticated,
  // isAdmin,
  userCtrl.EditPassword
); // Update password
userRoute.delete(
  "/profile/:id",
  isAuthenticated,
  isAdmin,
  userCtrl.DeleteAccount
); // Delete account

//! Customer Route

userRoute.get("/customer/profile", isAuthenticated, userCtrl.Profile); // Get profile
userRoute.put("/customer/profile/edit", isAuthenticated, userCtrl.EditProfile); // Edit profile
userRoute.put(
  "/customer/profile/password",
  isAuthenticated,
  userCtrl.EditPassword
); // Update password
userRoute.delete(
  "/customer/profile/:id",
  isAuthenticated,
  userCtrl.DeleteAccount
);



// Delete account

module.exports = userRoute;
