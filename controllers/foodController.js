const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    // val
    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        sucess: false,
        message: "please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res.status(200).send({
      sucess: true,
      message: "food item created sucessfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in create food Api",
      error,
    });
  }
};
// GET ALL FOOD
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(500).send({
        sucess: false,
        message: "No food found",
      });
    }
    res.status(200).send({
      sucess: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in getall food Api",
      error,
    });
  }
};
// Get Single Food
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        sucess: false,
        message: " Please provide foodId",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        sucess: false,
        message: "No food id found",
      });
    }
    res.status(200).send({
      sucess: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in get single food Api",
      error,
    });
  }
};
// Get Food By Resturant
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        sucess: false,
        message: " Please provide resturantId",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        sucess: false,
        message: "No food id found",
      });
    }
    res.status(200).send({
      sucess: true,
      message: "food based on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in get food by resturant Api",
      error,
    });
  }
};
// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        sucess: false,
        message: "No food id found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        sucess: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodtags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      sucess: true,
      message: "Food item updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in update food Api",
      error,
    });
  }
};
//DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const { foodId } = req.params.Id;
    if (!foodId) {
      return res.status(404).send({
        sucess: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(500).send({
        sucess: false,
        message: "No food found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      sucess: true,
      message: "food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in delete food Api",
      error,
    });
  }
};
// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        sucess: false,
        message: "please provide food cart or payment",
      });
    }
    // calc
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.Id,
    });
    await newOrder.save();
    res.status(201).send({
      sucess: true,
      message: "order placed sucessfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in place order Api",
      error,
    });
  }
};
// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.Id;
    if (!orderId) {
      return res.status(404).send({
        sucess: false,
        message: "please provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      sucess: true,
      message: "order status sucessfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in order status Api",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
