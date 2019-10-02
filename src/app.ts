import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { createChannel } from './recorder/RecorderFactory';
import config from './config/config';
import { Recorder } from './recorder'


import { ChannelRouter } from './api/routes/channel'

//@ts-ignore
function loggerMiddleware(request: express.Request, response: express.Response, next) {
  console.log(`[${new Date().toLocaleTimeString()}] ${request.method} ${request.path}`)
  next()
}


dotenv.config();

// ---------------- EXPRESS ---------------- 

const app = express();

app.use(loggerMiddleware);
app.set('port', config.port);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const r = express.Router()


app.use('/channels', ChannelRouter)
const recorder = new Recorder()

export { recorder }

export default app