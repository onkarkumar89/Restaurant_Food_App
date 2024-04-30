const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
//dotenv configuration
dotenv.config();

// DB connection
connectionDB();

//rest object
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> welcome to food server Api base project </h1>");
});
// port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`.white.bgMagenta);
});
