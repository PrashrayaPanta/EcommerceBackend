const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");
const Category = require("../model/Category.js");

const Post = require("../model/Product.js");

const categoryCtrl = {
  createCategory: asyncHandler(async (req, res) => {
    const { categoryName} = req.body;

    console.log(categoryName);


    const slug = categoryName.split(" ").join("-")

    //! Track the uniqueness of categoryName field

    const category = await Category.findOne({ categoryName });

    if (categoryName === category?.categoryName) {
      return res.status(400).json({ message: "Category should be unique" });
    }

    const categoryCreated = await Category.create({ categoryName, slug });

    res.status(201).json({ message: "Created successfully", categoryCreated });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    //get the id
    const { id } = req.params;

    //get Category collection deleted document in object form
    const deletedCategory = await Category.findByIdAndDelete(id);

    res.json({ message: "Deleted Certain Catgeory", deletedCategory });

    console.log(deletedCategory);
  }),

  getAllCategory: asyncHandler(async (req, res) => {
    const Categories = await Category.find();

    res.json({ message: "Get all category", Categories }).status(203);
  }),

  getCertainCategory: asyncHandler(async (req, res) => {
    console.log("I am inside certain category controller");

    const { id } = req.params;

    // Validate the `id`
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log(category);

    res
      .status(201)
      .json({ message: "Certain Category Fetched Successfully", category });
  }),

  EditCertainCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    const categoryDocument = await Category.findById(id);

    if (!categoryDocument) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (categoryDocument.categoryName === categoryName) {
      return res.json({
        message: "Category name is unchanged, please modify it",
      });
    }

    const afterUpdation = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );

    res.status(202).json({
      message: "Updated successfully",
      categoryDocumentAfterUpdation: afterUpdation,
    });
  }),

  getCertainCategoryProducts: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the `id`
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(id).populate({
      path: "posts",
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log(category);

    res
      .status(201)
      .json({ message: "Certain Category Fetched Successfully", category });
  }),
};

module.exports = categoryCtrl;
