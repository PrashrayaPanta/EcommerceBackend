const Brand = require("../model/Brand"); 


const cloudinary = require("cloudinary").v2;// Import the Brand model

const getImageDetailsHandler = async (req, res) => {

  console.log("I am insdie the getImge detaiuls handler")
  console.log("I am inside the get Image Details Handler");
  const { publicId } = req.params; // Get the public_id from request parameters

  console.log(publicId);

  try {
    // const imageDetails = await getImageByPublicId(publicId);

    const result = await cloudinary.api.resource(publicId);

    console.log(result);
    
    console.log("Image details fetched successfully:", result);


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

const deleteOnlyImageHandler = async (req, res) => {
 
  const {id} = req.params;

  const { publicId } = req.params;
  
  const {whichfolderinside} = req.params; // Get the folder name from request parameters


  const publicIdFull = whichfolderinside + "/" + publicId;

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
