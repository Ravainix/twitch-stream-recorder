import app from "./app";
import Models from './models'
import { connectDB } from "./models";

const eraseDatabaseOnSync = false;

const createTestUsers = async () => {
  const user1 = new Models.Channel({
    username: 'demonzz1'
  })

  const user2 = new Models.Channel({
    username: 'h2p_gucio'
  })

  await user1.save()
  await user2.save()
}

connectDB() //.then(async () => createTestUsers())


const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});



export default server;