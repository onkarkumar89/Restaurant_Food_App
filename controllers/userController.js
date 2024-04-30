const { response } = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const id = req.body.id;
    const user = await userModel.findById({ _id: id });

    //validation
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user not found",
      });
    }
    //hide password
    user.password = undefined;

    // response
    res.status(200).send({
      sucess: true,
      message: "user get sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error in get user api",
      error,
    });
  }
};
// update user
const updateUserController = async (req, res) => {
  try {
    // find user
    const id = req.body.id;
    const user = await userModel.findById({ _id: id });

    // validation
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user not found",
      });
    }
    // update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res.status(200).send({
      sucess: true,
      message: "user upated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error in update user api",
      error,
    });
  }
};

//update user password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const id = req.body.id;
    const user = await userModel.findById({ _id: id });
    // Validation
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user not found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        sucess: false,
        message: "please provide old or new password",
      });
    }
    // check user password || compare password

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(500).send({
        sucess: false,
        message: " Invalid old password ",
      });
    }
    // hasing password

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      sucess: true,
      message: "updated password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in update password api",
      error,
    });
  }
};

// RESET Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        sucess: false,
        message: "please provide all fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(500).send({
        sucess: false,
        message: "user not found or invalid answer",
      });
    }

    // hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      sucess: true,
      message: "Reset password sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in reset password api",
      error,
    });
  }
};

// DETETE Profile Account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      sucess: true,
      message: "your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "delete user failed",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
