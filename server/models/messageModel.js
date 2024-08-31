const { Schema, SchemaTypes, model } = require('mongoose');

const messageSchema = new Schema(
    {
        senderId: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

const Message = model("Message", messageSchema);

module.exports = {
    Message
};