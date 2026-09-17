const fs = require("fs");
const os = require("os");
const path = require("path");
const config = require("./config");

function getQualcommStatus() {
  const isWindows = process.platform === "win32";
  const isArm64 = os.arch() === "arm64";

  const encoderAvailable = fs.existsSync(config.encoderPath);
  const decoderAvailable = fs.existsSync(config.decoderPath);

  return {
    target: config.target,
    runtime: config.runtime,
    platform: process.platform,
    architecture: os.arch(),
    isWindows,
    isArm64,
    encoderAvailable,
    decoderAvailable,
    modelsAvailable: encoderAvailable && decoderAvailable,
    readyForQualcomm:
      isWindows &&
      isArm64 &&
      encoderAvailable &&
      decoderAvailable
  };
}

function printQualcommStatus() {
  const status = getQualcommStatus();

  console.log("Qualcomm AI Hub Backend");
  console.log("-----------------------");
  console.log(`Target: ${status.target}`);
  console.log(`Runtime: ${status.runtime}`);
  console.log(`Architecture: ${status.architecture}`);
  console.log(`Encoder available: ${status.encoderAvailable}`);
  console.log(`Decoder available: ${status.decoderAvailable}`);

  if (status.readyForQualcomm) {
    console.log("Qualcomm execution environment detected.");
    console.log("Qualcomm inference path is available.");
  } else {
    console.log("Qualcomm execution environment not available.");
    console.log("Using Whisper CPU fallback.");
  }

  return status;
}

module.exports = {
  getQualcommStatus,
  printQualcommStatus
};