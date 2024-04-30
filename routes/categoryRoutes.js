const express = require("express");
const { route } = require("./authRoutes");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();
//routes
// create category
router.post("/create", authMiddleware, createCategoryController);

// GET ALL Category

router.get("/getAll", getAllCategoryController);

// UPDATE Category

router.put("/update/:id", authMiddleware, updateCategoryController);

// DELETE Category

router.delete("/delete/:id", authMiddleware, deleteCategoryController);
module.exports = router;
