
import { ConnectOptions } from 'mongoose';
import { IN_PRODUCTION } from './app'

const {
    MONGO_HOST = 'localhost',
    MONGO_DATABASE = 'systo',
    MONGO_PORT = '27017',
    MONGO_USERNAME = '',
    MONGO_PASSWORD = ''
}: any = process.env

export const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const LOCAL_URI = `mongodb+srv://me:Sqb0NzshutN74DaR@nextoma.2mkb8.mongodb.net/prod`
// const LOCAL_URI = `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`
const REMOTE_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DATABASE}`

export const MONGO_URI = LOCAL_URI 
