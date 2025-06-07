const getImageDetails = require("../utils/cloudinaryUtils");
const deleteImageByPublicId = require("../utils/cloudinaryUtils");

const getImageDetailsHandler = async (req, res) => {
  const { publicId } = req.params; // Get the public_id from request parameters

  try {
    const imageDetails = await getImageDetails(publicId);
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
  const { publicId } = req.params; // Get the public_id from request parameters

  try {
    const result = await deleteImageByPublicId(publicId);
    res.status(200).json({
      message: "Image deleted successfully",
      result,
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
