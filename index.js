

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

app.use(express.json()); //passing incoming json data from the client

//!Routes

app.use("/api/category", categoryRoute);


app.use("/api/users", userRoute);

// app.use("/api/order". orderRoute);

app.use("/api/products", productRoute);

app.use("/api/order", orderRoute);


app.use("/api/brand", brandRoute);




// app.use("/api/customer", customerRoute);


app.use("/api/address", addressRoute);

//!Error handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
