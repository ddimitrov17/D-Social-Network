const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],  
        methods: ["GET", "POST"],
        credentials: true
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; 

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
    });
});

module.exports = {
    app, io, server, getReceiverSocketId
};