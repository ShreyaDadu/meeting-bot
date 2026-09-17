const fs = require("fs");
const path = require("path");
const os = require("os");

const encoderPath = path.join(
  __dirname,
  "..",
  "qualcomm_models",
  "job_jgddqyveg_optimized_onnx",
  "model.onnx"
);

const decoderPath = path.join(
  __dirname,
  "..",
  "qualcomm_models",
  "job_j568z910g_optimized_onnx",
  "model.onnx"
);

const isWindowsArm64 = process.platform === "win32" && os.arch() === "arm64";

const modelsAvailable =
  fs.existsSync(encoderPath) &&
  fs.existsSync(decoderPath);

module.exports = {
  enabled: modelsAvailable,

  target: "Snapdragon X2 Elite",

  runtime: "precompiled_qnn_onnx",

  encoderPath,
  decoderPath,

  modelsAvailable,

  isWindowsArm64,

  useQualcomm:
    modelsAvailable && isWindowsArm64,

  fallback: "whisper-cpu"
};