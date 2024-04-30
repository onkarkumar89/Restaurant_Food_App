//exports.autmidleware = (req, res, next) => {};
const JWT = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers["authorization"].split("")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          sucess: false,
          message: "un-Authorize user",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in auth Api",
      error,
    });
  }
};
