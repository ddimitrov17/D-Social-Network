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
            default: "https://res.cloudinary.com/dv7qy8zgi/image/upload/v1723978783/rgg4tf1w4qyk7sou6jxy.png"
        },
        coverImage: {
            type: String,
            default: "https://res.cloudinary.com/dv7qy8zgi/image/upload/v1723978805/drwkbeqxqg52rwrwf8sd.png"
        },
        bio: {
            type: String,
            default: ""
        },
        likedPosts: {
            type: Array,
            ref: "Post",
            default: []
        },
        bookmarks: {
            type: Array,
            ref: "Post",
            default: []
        },
        followers: {
            type: Array,
            ref: "User",
            default: []
        },
        following: {
            type: Array,
            ref: "User",
            default: []
        }
    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
    User
};
