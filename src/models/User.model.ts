import mongoose, { Schema, Document } from 'mongoose'

export interface Channel {
  username: string
}

const ChannelSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
})
const Channel = mongoose.model<Channel & Document>('User', ChannelSchema);

export default Channel