"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ServerApiVersion = _require.ServerApiVersion;

var uri = "mongodb+srv://yigitabdullah329:iZky8perYukepdD@cluster0.mjtlsrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

var _db;

function mongoConnect() {
  var connection;
  return regeneratorRuntime.async(function mongoConnect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          connection = _context.sent;
          _db = connection.db("shop");
          console.log("Connected to MongoDB!");
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getDb() {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
}

module.exports = {
  mongoConnect: mongoConnect,
  getDb: getDb
};