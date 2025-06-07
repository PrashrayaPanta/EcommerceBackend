const express = require("express");
const getImageDetailsHandler = require("../controller/File");
const deleteImageHandler = require("../controller/File");

const fileRoute = express.Router();

// Route to fetch image details by public_id
fileRoute.get("/image/:publicId", getImageDetailsHandler);

// Route to delete an image by public_id
fileRoute.delete("/image/:publicId", deleteImageHandler);

module.exports = fileRoute;
