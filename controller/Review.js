const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");
const Review = require("../model/Review.js");




const cloudinary = require("cloudinary").v2;

const reviewCtrl = {


  createReview: asyncHandler(async(req, res)=>{


      const {comment, rating} = req.body;


     const reviewcraeted =   await Review.create({comment, rating});

    res.json({review: reviewcraeted}).status(201);


  }),

  getReview: asyncHandler(async (req, res) => {

    console.log(req.body)


   const {comment,rating} = req.body;

    // Create the review

  const review =   await Review.create({
        comment,
        rating,
    })

    res.status(201).json({message:"review created successfully", review})



  }),


  deleteCertainreview: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the review by ID
    const review = await review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }

    // Check if the review has a logo and delete it from Cloudinary
    if (review.logo && review.logo.public_id) {
      try {
        // await deleteImageByPublicId(review.logo.public_id);

       await cloudinary.uploader.destroy(review.logo.public_id);


        console.log("Image deleted successfully from Cloudinary.");
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error.message);
        return res.status(500).json({ message: "Failed to delete image from Cloudinary", error: error.message });
      }
    }

    // Delete the review from the database
    await review.findByIdAndDelete(id);

    res.json({
      message: "review and associated image deleted successfully",
    });
  }),


  getAllreview: asyncHandler(async(req, res) =>{


    const reviews = await review.find();



    res.json({  reviews });

  }),


  EditCertainreview: asyncHandler(async(req, res) =>{




    const {id} = req.params;




    const {name, slogan} = req.body;



    console.log(name , slogan)


    const reviewDocument = await review.findById(id);


    if(!reviewDocument){
      throw new Error("review not found in ");
    }

      // Delete the old image from Cloudinary
    if (reviewDocument.logo && reviewDocument.logo.public_id)
    {
      await cloudinary.uploader.destroy(reviewDocument?.logo?.public_id);

    }

  
      
    if(!req.file){
      throw new Error("The image field value shouldnot be empty");
    }


  const updatedreview =   await review.findByIdAndUpdate(id, {
      name,
      slogan,
      logo: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    }, { new: true });


    res.status(200).json({
      message: "review updated successfully",
      updatedreview,
    });

  })


,
  GetCertainreview: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }

    res.json({
      message: "review fetched successfully",
      review,
    });
  })



};

module.exports = reviewCtrl;