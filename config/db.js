const mongoose = require("mongoose");
const colors = require("colors");

// function mongodb database connection
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${process.env.MONGO_URL}`.bgCyan);
  } catch (error) {
    console.log("DB error", error);
  }
};
module.exports = connectionDB;
