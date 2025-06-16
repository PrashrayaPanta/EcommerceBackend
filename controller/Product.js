const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const Product = require("../model/Product.js");

const User = require("../model/User.js");

const File = require("../model/File.js");

const Category = require("../model/Category.js");



const Brand = require("../model/Brand.js");


const productCtrl = {
  createProduct: asyncHandler(async (req, res) => {
    const { name, description, categoryId, initialPrice, discountPercentage, colors, sizes, stock } = req.body;



    const {brandId} = req.body;


    console.log(req.files);
 
    //By default the data coming form data is string no matter what you send 
    console.log(name, description, categoryId, initialPrice,  discountPercentage, colors, sizes, stock);
    

    // Parse JSON strings for colors and sizes if they are sent as strings
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
        const newFile = new File({
          url: file.path,
          public_id: file.filename,
        });

        await newFile.save();

        return {
          url: newFile.url,
          public_id: newFile.public_id,
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

    // Find the product and verify the user owns it
    const product = await Product.findOne({ _id: id, author: req.user });

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "you don't have permission to delete this product",
      });
    }

    // Delete the product

    // {new:true} doesnt show any effect on delete
    const afterDeletion = await Product.findByIdAndDelete(id);

    console.log(afterDeletion);

    // Remove the product from user's products array
    await User.findByIdAndUpdate(
      req.user,
      { $pull: { products: id } },
      { new: true }
    );

    res.json({
      status: "Success",
      message: "product deleted successfully",
      deletedproduct: afterDeletion,
    });
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
    const { id } = req.params;

    const { title, description } = req.body;

    // Find the product and verify the user owns it
    const product = await Product.findOne({ _id: id, author: req.user });

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: " you don't have permission to update this product",
      });
    }

    // Update the product
    const updatedproduct = await Product.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    res.json({
      status: "Success",
      message: "product updated successfully",
      updatedproduct,
    });
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
};

module.exports = productCtrl;
