const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yigitabdullah329:iZky8perYukepdD@cluster0.mjtlsrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _db;

async function mongoConnect() {
  try {
    const connection = await client.connect();
    _db = connection.db("shop");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getDb() {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

module.exports = { mongoConnect, getDb };
