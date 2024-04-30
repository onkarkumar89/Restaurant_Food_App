// create category

const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // Validation
    if (!title) {
      return res.status(500).send({
        sucess: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      sucess: true,
      message: " category created sucessfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in create category",
      error,
    });
  }
};

// GET ALL Category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        sucess: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      sucess: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error in get all category api",
      error,
    });
  }
};
// UPDATE Category
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        sucess: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      sucess: true,
      message: "Category updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in update category Api",
      error,
    });
  }
};
// DELETE Category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        sucess: false,
        message: " please provide delete category id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        sucess: false,
        message: "no category found with this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      sucess: true,
      message: " Delete category sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in delete category Api",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
