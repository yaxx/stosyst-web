import fs from 'fs'
import aws from 'aws-sdk'
import { randomBytes } from 'crypto';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';


const bucketName = "nextoma-bucket";

const {
    AWS_ACCESS_KEY_ID = 'AKIAXLDSOHSE3EQSDQGF',
    AWS_SECRET_ACCESS_KEY = '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'
}: any = process.env

const s3 = new S3({
    region: "us-east-2",
    signatureVersion: 'v4',
    accessKeyId : AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
})


const uploadToS3Bucket =  (stream: any, filename: string) => {

    console.log(filename)

    const params = ({
        Body: stream,
        Key: filename,
        Bucket: "nextoma-bucket",
    })

    return  s3.upload(params).promise()
}

 const saveOnServer = async (stream: any, filename: string) =>{
    const filepath = path.join(__dirname,`../../public/images/${filename}`)
    const out = await stream.pipe(fs.createWriteStream(filepath))
}

const downloadFileFromS3Bucket = (fileKey: string) => {
    const downloadParams: any = {
        key: fileKey,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream()
}

export {saveOnServer, uploadToS3Bucket, downloadFileFromS3Bucket }
