const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const SubCategory = require("../model/SubCategory.js");
const { login } = require("./user.js");

const subCategoryCtrl = {


  createSubCategory: asyncHandler(async (req, res) => {



        const {name} = req.body;



        const subcategoryFound = await SubCategory.findOne({name});



        if(subcategoryFound){
            throw new Error("Sub CATEGORY Name must be unique")
        }


        if(!name){
            throw new Error("Name should be empty")
        }

      const subcategory =  await SubCategory.create({name});

        res.json({subcategory})

  }),


  getAllSubCategory:asyncHandler(async(req, res)=>{

    const subcategories = await SubCategory.find();



    res.json({subcategories})



  }),



  deleteCategoryById:asyncHandler(async(req, res)=>{


    const {id} = req.params;




    const categoryFound = await SubCategory.findByIdAndDelete(id)


    res.json({message:"Deleted Succefsully", categoryFound})


  })

 

};

module.exports = subCategoryCtrl;