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

async function getPostById(req, res) {
    try {
        const postId = req.params.id;
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
            res.status(400).json({ error: "Can't find this post" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log('Error while finding this post');
    }
}

async function commentOnPost(req, res) {
    try {
        const { text } = req.body;
        let img = req.body.img;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (img) {
            const upload = await v2.uploader.upload(img);
            img = upload.secure_url;
        }

        const comment = { user: userId, text: text, img: img };

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
    }
};

async function likePost(req, res) {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const userAlreadyLikedThePost = post.likes.includes(userId);

        if (userAlreadyLikedThePost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedLikes);
        } else {
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }
    } catch (error) {
        console.log("Error in likePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    commentOnPost,
    likePost
}