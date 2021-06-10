const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const config = require("../config/config");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// API routes
require("./routes")(app);

// Add a connect listener

io.on("connection", function (socket) {
  console.log("Client connected.");

  // Disconnect listener
  socket.on("disconnect", function () {
    console.log("Client disconnected.");
  });
});
 
// io.emit(`notify`, {})
// const count = io.engine.clientsCount;
// // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
// const count2 = io.of("/").sockets.size;
// console.log('count',count,count2)

const server = http.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Telegram bot is listening on port 4000!", port);
});

exports.server = server;
exports.io = io;
