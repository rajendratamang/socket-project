const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const socketHandler = require("./socket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// initialize socket logic
socketHandler(io);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
