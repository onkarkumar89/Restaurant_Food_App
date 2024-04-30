//exports.autmidleware = (req, res, next) => {};
const userModel = require("../models/userModel");
module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(500).send({
        sucess: false,
        message: "only admin access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "UnAuthrized access",
      error,
    });
  }
};
