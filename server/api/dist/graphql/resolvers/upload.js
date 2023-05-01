"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const crypto_1 = require("crypto");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const fileSaver_1 = require("./fileSaver");
const config_1 = require("../../config");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const region = "us-east-2";
const bucketName = "nextoma-bucket";
const s3 = new aws_sdk_1.default.S3({
    region,
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
exports.default = {
    Upload: GraphQLUpload_js_1.default,
    Query: {
        imgUrl: async () => {
            const imgName = await (0, crypto_1.randomBytes)(16).toString('hex');
            const params = ({
                Key: imgName,
                Expires: 60,
                Bucket: bucketName,
            });
            const url = await s3.getSignedUrlPromise('putObject', params);
            return { url };
        }
    },
    Mutation: {
        uploadFile: async (parent, { file }) => {
            try {
                const { createReadStream } = await file;
                const uri = uuidv4();
                const stream = createReadStream();
                config_1.IN_PRODUCTION ? await (0, fileSaver_1.uploadToS3Bucket)(stream, uri) : await (0, fileSaver_1.saveOnServer)(stream, uri);
                return {
                    uri
                };
            }
            catch (error) {
                console.log('Error uploading to S3 bucket');
            }
        }
    }
};
//# sourceMappingURL=upload.js.map