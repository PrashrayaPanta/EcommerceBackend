const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const deviceRoute = express.Router();


const deviceInfoCtrl = require("../controller/Device");
const isAdmin = require("../middleware/isAdmin.js");




//! Admin

deviceRoute.post("/", isAuthenticated, deviceInfoCtrl.createDeviceInfo);



module.exports = deviceRoute;


