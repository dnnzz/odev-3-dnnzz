const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.end("realtime colors app");
});

const votes = {
  javascript: 0,
  go: 0,
  ruby: 0,
  cplus: 0,
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("new-vote", votes);

  socket.on("new-vote", (vote) => {
    console.log("New Vote:", vote);
    votes[vote] += 1;
    io.emit("new-vote", votes);
  });

  socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(port, "0.0.0.0", () => {
  console.log("listening on *:3000");
});
