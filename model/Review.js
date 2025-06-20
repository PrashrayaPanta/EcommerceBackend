const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {

    comment:{
        type:String,
    },

    rating:{
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
