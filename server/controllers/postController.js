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
        // console.log(post);
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

async function deletePost(req, res) {
    try {
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) { 
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await v2.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function editPost(req, res) {
    try {
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) { 
            return res.status(401).json({ error: "You are not authorized to edit this post" });
        }

        const { text } = req.body;
        let { img } = req.body;
        post.text = text;
        if (post?.img !== img) { // if the image is changed
            const imgId = post.img.split("/").pop().split(".")[0];
            await v2.uploader.destroy(imgId);
            const upload = await v2.uploader.upload(img);
            img = upload.secure_url;
            post.img = img;
        }
        await post.save();
        res.status(200).json({ message: "Post edited successfully" });
    } catch (error) {
        console.log("Error in editPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getTopThreePosts(req, res) {
    try {
        const posts = await Post.find()
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });
        const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);
        // console.log(sortedPosts);
        if (posts.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(sortedPosts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error);
    }
};

async function getProfile(req, res) {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getProfile controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function postExplore(req, res) {
    const { query } = req.query;
    // console.log(query);
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const posts = await Post.find({
            text: { $regex: query, $options: 'i' }
        })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.json(posts);
    } catch (error) {
        console.log('Search Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    commentOnPost,
    deletePost,
    editPost,
    getTopThreePosts,
    getProfile,
    postExplore
}