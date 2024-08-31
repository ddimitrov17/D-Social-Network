const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { getMessages, sendMessage } = require('../controllers/messageController');

const messageRoutes = express.Router();

messageRoutes.get("/get-all/:id", isUserLogged, getMessages);
messageRoutes.post("/send/:id", isUserLogged, sendMessage);

module.exports = {
    messageRoutes
} 