const { Server } = require("socket.io");
const { authenticateSocket } = require('../middleware/middleware')

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" },
        path: "/api/socket.io",
    });

    io.on("connection", (socket) => {

        authenticateSocket(socket, (err) => {
            if (err) {
                return socket.disconnect(); // Disconnect unauthorized users
            }


            // Load chat events only after authentication
            require("./controllers/chatController")(socket, io);
        });

        // Handle disconnect
        socket.on("disconnect", () => {
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket.IO not initialized!");
    return io;
};

module.exports = { initializeSocket, getIO };
