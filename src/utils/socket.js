import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_IO_URL, {
  transports: ["websocket"],
});
export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("connected");
  });
};

export const onVote = (vote, data) => {
  if (!socket) {
    console.error("something went wrong socket not connected");
    return false;
  }
  socket.emit(vote, data);
};

export const subscribeVotes = (callback) => {
  if (!socket) {
    console.error("something went wrong socket not connected");
    return false;
  }
  socket.on("new-vote", (vote) => {
    callback(vote);
  });
};
