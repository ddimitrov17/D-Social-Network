const { Schema, SchemaTypes, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: "" //TODO: Add default image
        },
        coverImage: {
            type: String,
            default: "" //TODO: Add default cover image
        },
        bio: {
            type: String,
            default: ""
        },
        likedPosts: {
            type: Array,
            ref: "Post",
            default: []
        }
    }, { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
    User
};