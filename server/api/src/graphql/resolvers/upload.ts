import fs from 'fs'
import path from 'path'
import aws from 'aws-sdk'
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
// import { GraphQLUpload } from 'graphql-upload';
import { saveOnServer, uploadToS3Bucket } from './fileSaver';
import { IN_PRODUCTION } from '../../config';

const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

const region = "us-east-2";
const bucketName = "nextoma-bucket";

const s3 = new aws.S3({
    region,
    signatureVersion: 'v4',
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export default {
    // Upload: GraphQLUpload,
    Query: {
        imgUrl: async () => {
            const imgName = await randomBytes(16).toString('hex')
            const params = ({
                Bucket: bucketName,
                Key: imgName,
                Expires: 60
            })
            const url = await s3.getSignedUrlPromise('putObject', params)
            return { url }
        }
    },

    Mutation: {
        uploadFile:  async (parent: any, { file }: any) => {
            try {
                    const { createReadStream } = await file
                    const uri = uuidv4();
                    const stream  = createReadStream();
                    IN_PRODUCTION ? await uploadToS3Bucket(stream, uri) : await saveOnServer(stream, uri)
                    return {
                        uri
                    }
            } 
            catch (error) {
                console.log('Error uploading to S3 bucket')
            }
            
      }
   }
}
