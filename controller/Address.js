const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");
const Address = require("../model/Address");
const User = require("../model/User");

const addressCtrl = {


  

  createAddress: asyncHandler(async (req, res) => {


    const os = require("os");

    const hostname = os.hostname();

    const { country, province, district, municipality, houseNumber, majorLandMark } = req.body;

    // Validate the required fields
    if (!country || !province || !district || !municipality || !houseNumber || !majorLandMark) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the address object
    const address = await Address.create({
      country,
      province,
      district,
      municipality,
      houseNumber,
      majorLandMark,
      hostname
    });

    // Find the user and update their address field
    const userFound = await User.findById(req.user_id);

    console.log(userFound)

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    userFound.address = address._id; // Add the address ID to the user
    await userFound.save();

    console.log(userFound);


  

    res.status(201).json({ message: "Address created successfully", address });
  }),

 

};

module.exports = addressCtrl;