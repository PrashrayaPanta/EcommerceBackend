const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  initialPrice: {
    type: Number,
    required: true,
  },

  finalPrice:{
    type: Number,
    required: true
  },

  discountPercentage: {
      type: Number,
      default: 0
  },


  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    }
  ],


  colors:[
    {
      name: {
        type: String,
        required: true,
      },

      hexCode: {
        type: String,
        required: true,
      },

      price:{
        type: Number,
        required:true
      }

    }

  ],

  sizes: [
    {
      name:{
        type:String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      }
    }
  ],


  stock: {
    type:Number,
    default:0,
    required: true
  },


  slug:{
      type: String,
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to Category model
    required: true,
  },

  brand_id:{

    type: mongoose.Schema.Types.ObjectId,
    ref:"Brand",
    required:true
  },


  reviews: [
    {
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, 
      },
    },
  ]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
