const { getImageByPublicId, deleteImageByPublicId } = require("../utils/cloudinaryUtils.js"); // Correctly destructure the import
const Brand = require("../model/Brand"); // Import the Brand model

const getImageDetailsHandler = async (req, res) => {
  console.log("I am inside the get Image Details Handler");
  const { publicId } = req.params; // Get the public_id from request parameters

  console.log(publicId);

  try {
    const imageDetails = await getImageByPublicId(publicId);
    res.status(200).json({
      message: "Image details fetched successfully",
      imageDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch image details",
      error: error.message,
    });
  }
};

const deleteImageHandler = async (req, res) => {
  console.log("I am inside the delete image handler");
  const { publicId, whichfolderinside, id } = req.params; // Get the public_id, folder, and brand ID from request parameters

  const publicIdFull = whichfolderinside + "/" + publicId;

  console.log(publicIdFull);

  try {
    // Delete the image from Cloudinary
     await deleteImageByPublicId(publicIdFull);

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
  deleteImageHandler,
};
