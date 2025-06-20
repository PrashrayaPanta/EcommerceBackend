const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const User = require("../model/User");

const DeviceInfo = require("../model/Device");

const deviceInfoCtrl = {
  createDeviceInfo: asyncHandler(async (req, res) => {
    console.log("I am inside the create device info");

    const { deviceId, deviceIp, deviceMac } = req.body;

    // Validate required fields
    if (!deviceId) {
      return res.status(400).json({ message: "deviceId is required" });
    }

    // Check if the deviceId already exists
    const deviceFound = await DeviceInfo.findOne({ deviceId });

    if (deviceFound) {
      return res.status(400).json({ message: "Device ID is not unique" });
    }


    

    console.log(deviceId, deviceIp, deviceMac);

    const created = await DeviceInfo.create({ deviceId, deviceIp, deviceMAC: deviceMac });

    res.status(201).json({ message: "Device info created successfully", created });
  }),
};

module.exports = deviceInfoCtrl;
