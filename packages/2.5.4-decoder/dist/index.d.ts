interface FrameInfo {
    bitsPerSample: number;
    componentCount: number;
    height: number;
    isSigned: boolean;
    width: number;
}
interface DecodeOptions {
    iterations?: number;
    decodeLevel?: number;
    decodeLayer?: number;
}
interface OpenJPEGOffset {
    x: number;
    y: number;
}
interface OpenJPEGDimension {
    width: number;
    height: number;
}
interface DecodedOpenJPEG {
    frameInfo: FrameInfo;
    decodedBuffer: ArrayBufferLike;
    colorSpace: number | undefined;
    maxDecodeLevel: number;
    maxDecodeLayer: number;
    imageOffset: OpenJPEGOffset;
    numberOfDecompositions: number;
    blockDimensions: OpenJPEGDimension;
    progressionOrder: number;
    isReversible: boolean;
    tileSize: OpenJPEGDimension;
    tileOffset: OpenJPEGOffset;
    resolutionAtLevel: number;
}
interface EncodeOptions {
    lossless?: boolean;
    compressionRatio?: number;
    decompositions?: number;
    progressionOrder?: number;
}

declare function decode(imageBuffer: ArrayBuffer, options?: DecodeOptions): Promise<DecodedOpenJPEG>;
declare function encode(pixelData: Uint8Array, frameInfo: FrameInfo, options?: EncodeOptions): Promise<Uint8Array>;
declare const _default: {
    decode: typeof decode;
    encode: typeof encode;
    OpenJPEGWASM: any;
};

export { _default as default };
