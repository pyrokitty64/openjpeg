var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_openjpegjs = __toESM(require("./openjpegjs.js"));
var openjpegjs;
async function decode(imageBuffer, options = {}) {
  if (!openjpegjs) {
    openjpegjs = await (0, import_openjpegjs.default)();
    console.log({ openjpegjs });
  }
  const iterations = options.iterations || 1;
  const decodeLevel = options.decodeLevel || 0;
  const decodeLayer = options.decodeLayer || 0;
  const decoder = new openjpegjs.J2KDecoder();
  const buffer = new Uint8Array(imageBuffer);
  const encodedBuffer = decoder.getEncodedBuffer(buffer.length);
  encodedBuffer.set(buffer);
  for (let i = 0; i < iterations; i++) {
    decoder.decodeSubResolution(decodeLevel, decodeLayer);
  }
  const resolutionAtLevel = decoder.calculateSizeAtDecompositionLevel(decodeLevel);
  const maxDecodeLevel = decoder.getNumDecompositions();
  const maxDecodeLayer = decoder.getNumLayers();
  const frameInfo = decoder.getFrameInfo();
  const imageOffset = decoder.getImageOffset();
  const numberOfDecompositions = decoder.getNumDecompositions();
  const progressionOrder = decoder.getProgressionOrder();
  const isReversible = decoder.getIsReversible();
  const blockDimensions = decoder.getBlockDimensions();
  const tileSize = decoder.getTileSize();
  const tileOffset = decoder.getTileOffset();
  const colorSpace = decoder.getColorSpace();
  var decodedBuffer = decoder.getDecodedBuffer();
  let subResolutions = "";
  for (let i = 0; i < decoder.getNumDecompositions() + 1; i++) {
    const resolution = decoder.calculateSizeAtDecompositionLevel(i);
    subResolutions += resolution.width + "x" + resolution.height + " ";
  }
  frameInfo.width = resolutionAtLevel.width;
  frameInfo.height = resolutionAtLevel.height;
  return {
    frameInfo,
    decodedBuffer,
    colorSpace,
    maxDecodeLevel,
    maxDecodeLayer,
    imageOffset,
    numberOfDecompositions,
    blockDimensions,
    progressionOrder,
    isReversible,
    tileSize,
    tileOffset,
    resolutionAtLevel
  };
}
async function encode(pixelData, frameInfo, options = {}) {
  if (!openjpegjs) {
    openjpegjs = await (0, import_openjpegjs.default)();
  }
  const encoder = new openjpegjs.J2KEncoder();
  try {
    const decodedBuffer = encoder.getDecodedBuffer({
      width: frameInfo.width,
      height: frameInfo.height,
      bitsPerSample: frameInfo.bitsPerSample,
      componentCount: frameInfo.componentCount,
      isSigned: frameInfo.isSigned
    });
    decodedBuffer.set(pixelData);
    const decompositions = options.decompositions ?? 5;
    const lossless = options.lossless ?? false;
    const progressionOrder = options.progressionOrder ?? 2;
    encoder.setDecompositions(decompositions);
    if (lossless) {
      encoder.setQuality(true, 1);
      encoder.setCompressionRatio(0, 0);
    } else {
      encoder.setQuality(false, 1);
      encoder.setCompressionRatio(0, options.compressionRatio ?? 1);
    }
    encoder.setProgressionOrder(progressionOrder);
    encoder.encode();
    const encoded = encoder.getEncodedBuffer();
    return new Uint8Array(encoded);
  } finally {
    encoder.delete();
  }
}
var index_default = {
  decode,
  encode,
  OpenJPEGWASM: import_openjpegjs.default
};
//# sourceMappingURL=index.js.map