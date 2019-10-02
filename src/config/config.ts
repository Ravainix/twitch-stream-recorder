const config = {
  port: process.env.PORT || 3000,
  twitchClientId: process.env.CLIENTID,
  db: {
    url: process.env.DB_URL || 'mongodb://127.0.0.1/recorder'
  }
}

export default config