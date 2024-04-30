const express = require("express");
const { route } = require("./authRoutes");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");

const router = express.Router();
//routes
// create resturant || post
router.post("/create", authMiddleware, createResturantController);

// GET All
router.get("/getAll", getAllResturantController);

// Get Resturant by ID
router.get("/get/:id", getResturantByIdController);

// DELETE resturant
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
