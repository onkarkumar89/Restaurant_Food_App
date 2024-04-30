const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      delivery,
      picup,
      isOpen,
      logUrl,
      rating,
      code,
      ratingCount,
      coords,
    } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(500).send({
        sucess: false,
        message: "please provide title and address",
      });
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      delivery,
      picup,
      isOpen,
      logUrl,
      rating,
      code,
      ratingCount,
      coords,
    });
    await newResturant.save();
    res.status(201).send({
      sucess: true,
      message: "new resturant created sucessfullt",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in create resturant Api",
      error,
    });
  }
};
// GET ALL RESTURANT
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        sucess: false,
        message: "no resturants available",
      });
    }
    res.status(200).send({
      sucess: true,
      totalcount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in get all resturant Api",
      error,
    });
  }
};
// Get Resturant by ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        sucess: false,
        message: "please provide resturant id",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        sucess: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      sucess: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error in get resturant by id in Api",
      error,
    });
  }
};

// Delete resturant
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        sucess: false,
        message: "No resturant found or provide resturant id",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      sucess: true,
      message: "resturant delete sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in delete resturant Api",
      error,
    });
  }
};
module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
