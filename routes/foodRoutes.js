const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//Routes
// Create food
router.post("/create", authMiddleware, createFoodController);
// Get All food
router.get("/getAll", getAllFoodController);
// Get Single Food
router.get("/get/:id", getSingleFoodController);
// Get Food by resturant
router.get("/getByResturant/:id", getFoodByResturantController);
// UPDATE food
router.put("/update/:id", authMiddleware, updateFoodController);
//DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);
// PLACE ORDER
router.post("/placeOrder", authMiddleware, placeOrderController);
// ORDER STATUS
router.post(
  "/orderStatus/:id",

  authMiddleware,
  adminMiddleware,
  orderStatusController
);
module.exports = router;
