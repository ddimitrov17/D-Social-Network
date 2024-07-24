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
        const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });
        if (posts.length === 0) {
			return res.status(200).json([]);
		}
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error);
    }
}

async function getPostById(req,res) {
    try {
        const postId=req.params.id;
        // console.log(postId)
        const post = await Post.findById(postId)
        .lean()
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });
        console.log(post);
        if (!post) {
            res.status(400).json({ error: "Can't find this post"});
        }
        res.status(200).json(post);
    } catch (error) {
        console.log('Error while finding this post');
    }
}



module.exports = {
    createPost,
    getAllPosts,
    getPostById
}