import { SessionOptions } from 'express-session'
import {IN_PRODUCTION} from './app'

const THIRTY_MINUTES = 1000 * 60 * 30

const {
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'ssh!secret!',
    SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,
} = process.env

export const SESSION_OPTIONS:SessionOptions = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    cookie: {
        secure: IN_PRODUCTION,
        sameSite: true,
        maxAge: +SESSION_IDLE_TIMEOUT
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}