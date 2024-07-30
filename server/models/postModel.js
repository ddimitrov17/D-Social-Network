const { Schema, SchemaTypes, model } = require('mongoose');
const { User } = require('./userModel');

const postSchema = new Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String
        },
        img: {
            type: String
        },
        likes: [
            {
                type: SchemaTypes.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                text: {
                    type: String,
                    required: true
                },
                user: {
                    type: SchemaTypes.ObjectId,
                    ref: "User",
                    required: true
                },
                img: {
                    type: String
                }
            }
        ],
        bookmarkedBy: {
            type: Array,
            ref: "User",
            default: []
        }
    }, { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = {
    Post
};