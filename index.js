console.log("Hello I am starting the vs code");

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const userRoute = require("./Routes/userRoute.js");

const mongoose = require("mongoose");

// const errorHandler = require("./middleware/errHandler");

const errorHandler = require("./middleware/errHandler");

const categoryRoute = require("./Routes/categoryRoute.js");

const productRoute = require("./Routes/productRoute.js");
const orderRoute = require("./Routes/orderRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const addressRoute = require("./Routes/addressRoute.js");

const reviewRoute = require("./Routes/reviewRoute.js");
const deviceRoute = require("./Routes/deviceRoute.js");

const subCategoryRoute = require("./Routes/subCategoryRoute.js");

const PORT = process.env.PORT || 3000;

//allowing all the port to acess the backend server with ip.

app.use(cors());

console.log("Hello i am just above mongodb connedction function");

//!Connect to mongodb

mongoose
  .connect(process.env.Mongodb_URI)

  .then(() => console.log("DB connected succesfully"))
  .catch((error) => console.log(error));


//!Middlewares

app.use(express.json());

 //passing incoming json data from the client

//!Routes

app.use("/api", categoryRoute);

app.use("/api", subCategoryRoute);

app.use("/api", userRoute);

// app.use("/api/order". orderRoute);

app.use("/api", productRoute);

app.use("/api/order", orderRoute);

app.use("/api", brandRoute);

app.use("/api", reviewRoute);

app.use("/api/address", addressRoute);

//!Error handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
