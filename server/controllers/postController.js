const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const { v2 } = require('cloudinary');

async function createPost(req, res) {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user.id.toString();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!text) {
            return res.status(400).json({ error: "Post must have text" });
        }

        if (img) {
            const upload = await v2.uploader.upload(img);
            img = upload.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost controller: ", error);
    }
};

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        if (posts.length === 0) {
			return res.status(200).json([]);
		}
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error);
    }
}



module.exports = {
    createPost,
    getAllPosts
}