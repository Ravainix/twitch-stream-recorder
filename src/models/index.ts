import mongoose from 'mongoose'
import config from '../config/config';

import Channel from "./User.model";

const connectDB = () => {
  return mongoose.connect(config.db.url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('  Mongodb connected!'))
    .catch(err => console.log(err))
}

const Models = {
  Channel
}

export { connectDB }

export default Models