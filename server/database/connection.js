const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const { Post } = require("../models/postModel");
const { Event } = require("../models/eventModel");
const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error(`Error while connecting to the database!: ${error.message}`);
    }
}

module.exports = {
    mongoConnection
}