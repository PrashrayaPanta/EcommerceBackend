const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {

    name:{

        type:String,
        required:true,

    },

    slogan:{
        type: String,
        required:true,
    },

    logo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    slug:{

      type: String,
      required: true,
      unique: true,

    }


  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
