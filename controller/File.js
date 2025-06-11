const Brand = require("../model/Brand"); 


const cloudinary = require("cloudinary").v2;// Import the Brand model

const getImageDetailsHandler = async (req, res) => {

  try {


    const { filename, nodejsBrandImage } = req.params; // Extract parameters from the request

    console.log("Fetching image for:", filename, nodejsBrandImage);

    // Combine folder name and filename to form the public ID
    const publicID = `${nodejsBrandImage}/${filename}`;

    console.log("Fetching details for publicId:", publicID);


    // console.log(publicID)

    // Fetch image details from Cloudinary  `
    const result = await cloudinary.api.resource(publicID);



    // Check if the result contains a secure URL or if the image exists

    // if (!result || !result.secure_url) {
    //   return res.status(404).json({ message: "Image not found in Cloudinary" });
    // }

  
    // Redirect the client to the image URL
    res.redirect(result.secure_url);
  } catch (error) {
    console.error("Error fetching image details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      message: "Failed to fetch image details",
      error: error.message,
    });
  }
};

const deleteOnlyImageHandler = async (req, res) => {
 
  const {id} = req.params;

  const { filename } = req.params;
  
  const {whichfolderinside} = req.params; // Get the folder name from request parameters


  const publicIdFull = whichfolderinside + "/" + filename;

  // console.log(publicIdFull);

  try {
    // Delete the image from Cloudinary
     await cloudinary.uploader.destroy(publicIdFull);

    // Update the Brand document to remove the logo
     await Brand.findByIdAndUpdate(
      id,
      { logo: null }, // Set the logo field to null
      { new: true }
    );

    res.status(200).json({
      message: "Image deleted successfully and brand updated",
  
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

module.exports = {
  getImageDetailsHandler,
  deleteOnlyImageHandler,
};
