import axios, { AxiosRequestConfig } from 'axios'
import { TwitchHelper } from '../util/twitchHelpers'
import { Channel } from '../models/User.model'
//@ts-ignore
import m3u8stream from 'm3u8stream'
import fs from 'fs'

export interface ChannelImpl extends Channel {
  getStream(): void;
  checkStatus(): Promise<boolean>;
  record(): void;
  stopRecording(): void;
}

class RecordingChannel implements ChannelImpl {
  twitchHelper: TwitchHelper;
  username: string;
  clientId: string;
  private stream: any;

  constructor(channel: string) {
    this.twitchHelper = new TwitchHelper();
    this.username = channel;
  }

  checkStatus() {
    return this.twitchHelper.isStreamOnline(this.username)

  }

  getStream() {
    return this.twitchHelper.getPlaylist(this.username);
  }

  async record() {
    const date = new Date()
    const playlist = await this.getStream()

    console.log(`[${date.toLocaleTimeString()}] ${this.username}: Started recording`)

    this.stream = m3u8stream(playlist[0].url as string)

    this.stream.pipe(fs.createWriteStream(`${this.username}_${date.toLocaleDateString().replace(/[/]/g, '-')}.mp4`))

  }

  stopRecording(): void {
    this.stream.end()
  }
}

export function createChannel(channel: string): RecordingChannel {
  return new RecordingChannel(channel)
}