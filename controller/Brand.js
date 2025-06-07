const asyncHandler = require("express-async-handler");
const File = require("../model/File"); // Import the File model

const mongoose = require("mongoose");
const Brand = require("../model/Brand");
const deleteImageByPublicId = require("../utils/cloudinaryUtils");

const brandCtrl = {
  createBrand: asyncHandler(async (req, res) => {
    console.log("Inside createBrand controller");



    const uploadedindbFile =  await File.create({
        url: req.file.path,
        public_id: req.file.filename,

   })


   const {name,slogan} = req.body;



   const brandDocument = await Brand.findOne({name});


   if(brandDocument){
      throw new Error("Brand with this name already exists");
   }


   const slug = name.split(" ").join("-");



   //!empty value validation
   if(!name || !slogan || !req.file || !slug) {
       throw new Error("All fields are required");
   }


    // Create the brand

    await Brand.create({
        name,
        slogan,
        logo: {
            url: uploadedindbFile.url,
            public_id: uploadedindbFile.public_id,
        },
        slug
    })
  }),


  deleteCertainBrand: asyncHandler(async (req, res) => {


    const { id } = req.params;


    const brand = await Brand.findByIdAndDelete(id);


    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Delete the logo image from Cloudinary using the public_id
    deleteImageByPublicId(brand.logo.public_id);  


    // Delete the logo file from the File model
    await File.findOneAndDelete({ public_id: brand.logo.public_id , url: brand.logo.url });
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


    const BrandDocument = await Brand.findById(id);


    if(BrandDocument.name === name && BrandDocument.slogan){

      throw new Error("Brand name and slogan are unchanged, please modify them");

    }



    if(!req.file || !name || !slogan ){
      throw new Error("The field value should not be empty");
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