const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete an image by public_id
const deleteImageByPublicId = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error.message);
    throw error;
  }
};

module.exports = deleteImageByPublicId;
