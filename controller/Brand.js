const asyncHandler = require("express-async-handler");
const File = require("../model/File"); // Import the File model

const mongoose = require("mongoose");
const Brand = require("../model/Brand");
const deleteImageByPublicId = require("../utils/cloudinaryUtils");

const brandCtrl = {
  createBrand: asyncHandler(async (req, res) => {
    console.log("Inside createBrand controller");


    console.log(req.file);


   const {name,slogan} = req.body;



   const slug = name.split(" ")?.join("-");


     //  //!empty value validation
   if(!name || !slogan || !req.file || !slug) {
       throw new Error("All fields are required");
   }



   const brandDocument = await Brand.findOne({name});


   if(brandDocument){
      throw new Error("Brand with this name  already exists");
   }


    // Create the brand

  const brand =   await Brand.create({
        name,
        slogan,
        logo: {
            url: req.file.path,
            public_id: req.file.filename,
        },
        slug
    })

    res.status(201).json({message:"Brand created successfully", brand})


  }),


  deleteCertainBrand: asyncHandler(async (req, res) => {


    const { id } = req.params;


    const brand = await Brand.findByIdAndDelete(id);


    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Delete the logo image from Cloudinary using the public_id
    deleteImageByPublicId(brand.logo.public_id);  


    if (!brand.logo.public_id) {
      return res.status(404).json({ message: "Logo file not found" });
    }

    // Respond with success message and deleted brand information

    console.log("Brand deleted successfully:", brand);

    res.json({
      message: "Brand deleted successfully",
      deletedBrand: brand,
    });



  }),


  getAllBrand: asyncHandler(async(req, res) =>{


    const brands = await Brand.find();

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }

    res.json({ message: "All Brands fetched successfully", brands });

  }),


  EditCertainBrand: asyncHandler(async(req, res) =>{


    const {id} = req.params;

    const {name, slogan} = req.body;



    console.log(name , slogan)


    const BrandDocument = await Brand.findById(id);

      // Delete the old image from Cloudinary

    deleteImageByPublicId(BrandDocument.logo.public_id);        
      

    if(!req.file){
      throw new Error("The image field value shouldnot be empty");
    }


  const updatedBrand =   await Brand.findByIdAndUpdate(id, {
      name,
      slogan,
      logo: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    }, { new: true });


    res.status(200).json({
      message: "Brand updated successfully",
      updatedBrand,
    });

  })


};

module.exports = brandCtrl;