"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileFromS3Bucket = exports.uploadToS3Bucket = exports.saveOnServer = void 0;
const fs_1 = __importDefault(require("fs"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const path_1 = __importDefault(require("path"));
const bucketName = "nextoma-bucket";
const { AWS_ACCESS_KEY_ID = 'AKIAXLDSOHSE3EQSDQGF', AWS_SECRET_ACCESS_KEY = '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' } = process.env;
const s3 = new s3_1.default({
    region: "us-east-2",
    signatureVersion: 'v4',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
const uploadToS3Bucket = (stream, filename) => {
    const params = ({
        Body: stream,
        Key: filename,
        Bucket: "nextoma-bucket",
    });
    return s3.upload(params).promise();
};
exports.uploadToS3Bucket = uploadToS3Bucket;
const saveOnServer = async (stream, filename) => {
    const filepath = path_1.default.join(__dirname, `../../public/images/${filename}`);
    const out = await stream.pipe(fs_1.default.createWriteStream(filepath));
};
exports.saveOnServer = saveOnServer;
const downloadFileFromS3Bucket = (fileKey) => {
    const downloadParams = {
        key: fileKey,
        Bucket: bucketName,
    };
    return s3.getObject(downloadParams).createReadStream();
};
exports.downloadFileFromS3Bucket = downloadFileFromS3Bucket;
//# sourceMappingURL=fileSaver.js.map