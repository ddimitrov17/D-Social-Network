const { Schema, SchemaTypes, model } = require('mongoose');

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: SchemaTypes.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: SchemaTypes.ObjectId,
                ref: "Message",
                default: []
            }
        ]
    }, { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);

module.exports = {
    Conversation
};