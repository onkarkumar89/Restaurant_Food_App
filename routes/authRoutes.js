const express = require("express");
const {
  regiserController,
  loginController,
} = require("../controllers/authController");
const router = express.Router();
//routes
//REGISTER || POST
router.post("/register", regiserController);

// login // post
router.post("/login", loginController);

module.exports = router;
