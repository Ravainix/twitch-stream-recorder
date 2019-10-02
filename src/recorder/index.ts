// import { Channel } from '../models/User.model'
import Models from '../models'
import { Channel } from '../models/User.model'
import { ChannelImpl, createChannel } from "./RecorderFactory";


export class Recorder {
  public channels: ChannelImpl[];

  constructor() {

    this.createChannels(this.getStreamsFromDB())
  }

  private getStreamsFromDB(): Promise<Channel[]> {
    const Users: Promise<Channel[]> = new Promise((resolve, reject) => {
      Models.Channel.find({}, (err, channels: Channel[]) => {
        // this.channels = users.map(usr => createChannel(usr.username))
        resolve(channels)
      })
    })


    return Users
  }

  private async createChannels(channels: Promise<Channel[]>) {
    const channelsFromDB = await channels
    this.channels = channelsFromDB.map(channel => createChannel(channel.username))

    this.checkStreamsStatus()
  }

  public addChannel(username: string) {
    const newChannel = createChannel(username);

    this.channels.push(newChannel)
    if (newChannel.checkStatus())
      newChannel.record()
  }


  public async updateStreams() {
    let channelsFromDB = await this.getStreamsFromDB()

    channelsFromDB = channelsFromDB.filter(channel => !this.channels.find(({ username }) => username === channel.username))

    channelsFromDB.forEach(element => {
      this.channels.push(createChannel(element.username))
    });
  }

  public checkStreamsStatus(): void {
    this.channels
      .forEach(channel => channel.checkStatus()
        .then(res => res ? channel.record() : ''))
    // .then(res => console.log({ channel: channel.username, online: res })))
  }

  public deleteChannel(username: string) {
    this.channels = this.channels.filter(el => el.username !== username)
  }
}