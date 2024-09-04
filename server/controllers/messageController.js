const { Conversation } = require('../models/conversationModel');
const { Message } = require('../models/messageModel');
const { User } = require('../models/userModel');

async function sendMessage(req, res) {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function getMessages(req, res) {
    try {
        const { id: otherUserInTheConversationId } = req.params;
        const senderId = req.user._id;

        const userToChat = await User.findById(otherUserInTheConversationId);
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, otherUserInTheConversationId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json({ messages, userToChat });
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function getUserConversations(req, res) {
    let users = [];
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({
            participants: userId,
        }).populate("messages")
            .populate({
                path: "participants",
                select: "-password -likedPosts -bookmarks -following -followers -coverImage -bio"
            });;
        const filteredConversations = conversations.map((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participant) => participant._id.toString() !== userId.toString()
            );
            return conversation;
        });

        console.log(filteredConversations);
        res.status(200).json(filteredConversations);
    } catch (error) {
        console.log("Error in getUserConversations controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}




module.exports = {
    sendMessage,
    getMessages,
    getUserConversations
}