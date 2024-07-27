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
            default: "https://res.cloudinary.com/dv7qy8zgi/image/upload/v1722093871/wa7oxvqtkfbmk1uwco16.png" 
        },
        coverImage: {
            type: String,
            default: "https://res.cloudinary.com/dv7qy8zgi/image/upload/v1722093871/p3uz1mdb81jqepivbyjg.png" 
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