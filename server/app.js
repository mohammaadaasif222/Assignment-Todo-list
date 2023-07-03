const experss = require("express");
const todoRoutes = require("./routes/todo");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config/config.env" });

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// cloudninary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(cors("origin", "*"));

// Routes
app.use("/", todoRoutes);



// Middle wares
app.use(errorMiddleware);

module.exports = app;
