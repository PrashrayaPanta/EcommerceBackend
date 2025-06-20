const mongoose = require("mongoose");

const deviceInfoSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    unique: true,
    required: true,
  },
  deviceIp: {
    type: String,
    unique: true,

  },
  deviceMAC: {
    type: String,
    unique: true,

  },
});

const DeviceInfo = mongoose.model("DeviceInfo", deviceInfoSchema);

module.exports = DeviceInfo;
