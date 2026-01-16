const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("test_event", (data) => {
      console.log("📩 Test event received:", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
