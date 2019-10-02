import axios, { AxiosRequestConfig } from 'axios'

export interface TwitchApiResponse {
  streamId: string;
  userName: string;
  type: string;
  title: string;
  vieverCount: string;
}

export class TwitchHelper {
  private clientId: string;

  constructor() {
    this.clientId = process.env.CLIENTID as string;
  }

  getStreamData(channel: string): Promise<TwitchApiResponse> {
    const url = `https://api.twitch.tv/helix/streams?user_login=${channel}`
    let response = {};

    const reqCofig: AxiosRequestConfig = {
      url: url,
      headers: {
        'Client-ID': this.clientId
      }
    }

    return axios(reqCofig)
      .then(((res: any) => res.data.data[0] ? res.data.data[0] : {}))
      // .then(data => console.log(data))
      .catch(err => new Error(err))
  }

  async isStreamOnline(channel: string) {
    const data = await this.getStreamData(channel);
    return data.type ? true : false;
  }

  async getPlaylist(channel: string) {

    const { token, sig } = await this.getAcessToken(channel);

    return axios
      .get(`https://usher.ttvnw.net/api/channel/hls/${channel}?client_id=${this.clientId}&token=${token}&sig=${sig}&allow_source`)
      .then(res => res.data)
      .then(data => {
        const parsedPlaylist = [];
        const lines = data.split('\n');
        for (let i = 4; i < lines.length - 1; i += 3) {
          parsedPlaylist.push({
            quality: lines[i - 2].split('NAME="')[1].split('"')[0],
            url: lines[i]
          });
        }
        return parsedPlaylist;
      })
    // .then(data => console.log(data))
  }


  private getAcessToken(channel: string) {
    return axios
      .get(`https://api.twitch.tv/api/channels/${channel}/access_token?client_id=${this.clientId}`)
      .then(data => data.status === 200 ? data.data : data.data.message)
    // .then(data => console.log(data))
  }
}