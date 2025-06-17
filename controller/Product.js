const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const Product = require("../model/Product.js");

const User = require("../model/User.js");


const cloudinary = require("cloudinary").v2;// Import the Brand model



const Category = require("../model/Category.js");



const Brand = require("../model/Brand.js");
const { deleteOnlyImageHandler } = require("./File.js");


const productCtrl = {
  createProduct: asyncHandler(async (req, res) => {
    const { name, description, categoryId, initialPrice, discountPercentage, colors, sizes, stock } = req.body;



    const {brandId} = req.body;


    console.log(req.files);
 
    //By default the data coming form data is string no matter what you send 
    console.log(name, description, categoryId, initialPrice,  discountPercentage, colors, sizes, stock);



    
    

    // Parse JSON strings for colors and sizes
    const parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors;
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;



    // console.log(typeof parsedColors, typeof parsedSizes);



    console.log(typeof parsedColors);


    //! Empty Value Validation
  
    if (!name || !description || !categoryId || !initialPrice || !discountPercentage || !parsedColors || !parsedSizes || !stock) {
      return res.status(400).json({ message: "Empty value halis" });
    }

  
    if(discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({ message: "Discount percentage must be between 0 and 100" });
    }

    const finalPrice = initialPrice - (initialPrice * (discountPercentage / 100));



    const slug = name.split(" ").join("-")


    console.log(slug);


    // const categoryDocument = await Category.findOne({_id: categoryId});


    // console.log(categoryDocument)

    const categoryDocById = await Category.findById(categoryId);

    console.log(categoryDocById);



    const brandDocById = await Brand.findById(brandId);






    const images = await Promise.all(
      req.files.map(async (file) => {
        return {
          url: file.path,
          public_id: file.filename,
        };
      })
    );

    // Create the product
    const product = await Product.create({
      images,
      name,
      description,
      initialPrice,
      finalPrice,
      slug,
      discountPercentage,
      colors: parsedColors,
      sizes: parsedSizes,
      stock,
      category_id: categoryDocById._id,
      brand_id: brandDocById._id
    });


    // console.log(product);
    

    res.status(201).json({ message: "Product created successfully", product });
  }),

  deleteproduct: asyncHandler(async (req, res) => {
    const { id } = req.params;

    //find product By Id
    const productFound = await Product.findById(id);

    console.log(productFound);

    productFound?.images.map(async image => {

      //destroy each image
      
      await cloudinary.uploader.destroy(image.public_id);

      
    });



     await Product.findByIdAndDelete(id);


    res.json({
      status: "Success",
      message: "product deleted successfully",
      // deletedproduct: afterDeletion,
    });
  }),



  EditProduct: asyncHandler(async(req, res) =>{





  }),



  getAllproduct: asyncHandler(async (req, res) => {
    const products = await Product.find();

    

    res.status(201).json({ products });

    //
  }),

  getCertainproduct: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "product not found",
      });
    }

    res.json({
      status: "Success",
      product,
    });
  }),


  getAllProductByCategoryId: asyncHandler(async(req, res) =>{


    const {id} = req.params;

    const products = await Product.find({category_id: id});


    console.log(products);


  }),




  getAllProductByBrandId: asyncHandler(async(req, res) =>{


    // const {id} = req.params;


    // console.log(id);


    const {slug} = req.params;


    console.log(slug);




    
    

    // const {slug} = req.params;


    // console.log(slug);

    const products = await Product.find({slug: slug  });


    console.log(products);
    

    res.json({products})





  })
,


  //! Update the product
  updateCertainproduct: asyncHandler(async (req, res) => {


  console.log("I am inside the edit certain product controoler");
  

    const {id} = req.params;

    console.log(id);



    const {name, description, summary, categoryId, brandId} = req.body;



    console.log(name, description, summary, categoryId, brandId);
    


    if(!name | !description | !summary | !categoryId | !brandId){
      throw new Error("Empty value halis");

    }

    const product = await Product.findById(id);


    // console.log(product);
    
    if(product.name === name || product.description === description  || product.summary === summary || product.category_id === categoryId || product.brand_id === brandId ){
      throw new Error("Same Name");
    }













  
  }),







  getCertainproductCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).select("-initialPrice -finalPrice -description").populate("category_id", "categoryName, slug");

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "product not found",
      });
    }

    res.json({
      status: "Success",
      product,
    });
  }),

  Latestproducts: asyncHandler(async (req, res) => {
    const products = await Product.find()
      .limit(2)
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("author", "username");

    // Extract only username not only field
    // .limit(5)
    // .populate("author", "username");

    // console.log(products);

    res.status(201).json({
      status: "success",
      products,
    });
  }),

  //! Search product

  searchproduct: asyncHandler(async (req, res) => {
    const { query } = req;

    //! Populating the username and email only
    const products = await Product.find(query).populate("author", "username email");

    res.status(200).json({
      status: "Success",
      message: "Search results",
      count: products.length,
      products,
    });
  }),

  getAllProductsByCategory: asyncHandler(async (req, res) => {
    const { categoryId } = req.params; // Get the category ID from the request parameters

    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Fetch all products
    const allProducts = await Product.find().populate("category_id");

    // Filter products belonging to the specified category
    const filteredProducts = allProducts.filter(
      (product) => product.category_id && product.category_id._id.toString() === categoryId
    );

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({ products: filteredProducts });
  }),

  getAllProductsByCategoryName: asyncHandler(async (req, res) => {
    const { categoryName } = req.params; // Get the categoryName from the request parameters

    // Find the category by name
    const category = await Category.findOne({ categoryName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Use the category's _id to fetch products
    const products = await Product.find({ category_id: category._id }).populate("category_id");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({ products });
  }),


  createCertainProductReviews:asyncHandler(async(req, res)=>{


    const {id} = req.params;

    const product = await Product.findById(id);


    console.log(product);
    


    //create the reviews


    const {comment, rating} = req.body;


    product.reviews.push({comment, rating})
  


    await product.save();


    res.json({message:"review Created Succesfully"})


  })



};

module.exports = productCtrl;
