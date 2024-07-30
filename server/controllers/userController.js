const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

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

            res.status(200).json({ liked: false });
        } else {
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            res.status(200).json({ liked: true });
        }
    } catch (error) {
        console.log("Error in likePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function getLikeStatus(req, res) {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const liked = user.likedPosts.includes(postId);
        res.status(200).json({ liked });
    } catch (error) {
        console.error("Error in getLikeStatus controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function bookmarkPost(req, res) {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userAlreadyBookmarkedThePost = post.bookmarkedBy.includes(userId);

        if (userAlreadyBookmarkedThePost) {
            await Post.updateOne({ _id: postId }, { $pull: { bookmarkedBy: userId } });
            await User.updateOne({ _id: userId }, { $pull: { bookmarks: postId } });

            res.status(200).json({ bookmarked: false });
        } else {
            post.bookmarkedBy.push(userId);
            await User.updateOne({ _id: userId }, { $push: { bookmarks: postId } });
            await post.save();

            res.status(200).json({ bookmarked: true });
        }

        await user.save();
    } catch (error) {
        console.error('Error in bookmarkPost controller: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function getBookmarkStatus(req, res) {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const bookmarked = user.bookmarks.includes(postId);
        res.status(200).json({ bookmarked });
    } catch (error) {
        console.error("Error in getBookmarkStatus controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    likePost,
    getLikeStatus,
    bookmarkPost,
    getBookmarkStatus
}