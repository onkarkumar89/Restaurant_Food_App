const express = require("express");
const { route } = require("./authRoutes");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
} = require("../controllers/userController");

//const { authMiddleware } = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
//routes
//GET USER || GET

router.get("/getUser", authMiddleware, getUserController);

// PUT USER
router.put("/updateUser", authMiddleware, updateUserController);

//  password Update

router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET password

router.post("/resetpassword", authMiddleware, resetPasswordController);

// Detete USER

router.delete("/deleteuser/:id", authMiddleware);
module.exports = router;
