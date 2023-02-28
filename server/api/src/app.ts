import express from 'express'
import cors from 'cors'
import path from 'path'
import {IN_PRODUCTION} from './config'
import session, { Store } from 'express-session';
// const { graphqlUploadExpress } = require("graphql-upload");
import { downloadFileFromS3Bucket } from './graphql/resolvers/fileSaver';

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

export const corsOptions = {
  origin: "*",
  credentials: true
}

export const createExpressApp = () => {

    const app =  express()

    const IMAGES_PATH = path.join(__dirname, 'public', 'images')
    const STATIC_PATH =  path.join(__dirname, IN_PRODUCTION ? 'dist/build' : 'public')

    app.use(cors(corsOptions))
    app.use(express.static(STATIC_PATH));
    // app.use(graphqlUploadExpress());
    app.use("/images", express.static(IMAGES_PATH))


    // app.use(session({
    //     ...SESSION_OPTIONS,
    //     store
    // }))

    // app.post("/images", upload.single('image'), function (req, res) {
    //   console.log(req)
    //   res.send('OK')
    //   console.log(req.params)
    //   res.send('')
    //   const stream = streamFileFromS3Bucket(req.params.key)
    //   stream.pipe(res)
    // })

    // app.get("/images/:key", function (req, res) {
    //   console.log(req.params)
    //   res.send('')
    //   const stream = streamFileFromS3Bucket(req.params.key)
    //   stream.pipe(res)
    // })

    app.get('/*', function (req, res) {
      // res.sendFile(path.resolve(__dirname, '../dist/build', 'index.html'));
    })
    app.disable('x-powered-by')

    return app
}


