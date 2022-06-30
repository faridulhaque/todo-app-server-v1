const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// connecting database

const uri = `mongodb+srv://faridmurshed:WoeuXOFxFTkfdN6o@cluster0.mz9bb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// working with rest api
async function run() {
  try {
    await client.connect();
    const tasksCollection = client.db("myTodo").collection("tasks");

    //   posting added tasks in db
    app.post("/tasks", async (req, res) => {
      const tasks = req.body;
      const result = await tasksCollection.insertOne(tasks);
      res.send(result);
    });
    //   getting data for home page tasks
    app.get("/myTasks", async (req, res) => {
      const email = req.query.email;

      const query = { email: email };
      const cursor = tasksCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// testing server
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log("listening to port", port);
});
