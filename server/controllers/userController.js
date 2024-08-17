const { v2 } = require("cloudinary");
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

async function editProfile(req, res) {
    async function validateImageURL(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok && response.headers.get('Content-Type').startsWith('image/');
        } catch (error) {
            return false;
        }
    }
    try {
        const userId = req.user._id;
        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { username, fullName, email, bio } = req.body;
        let { profilePicture, coverImage } = req.body;

        // Default images
        const defaultProfilePicture = process.env.DEFAULT_PROFILE_PICTURE;
        const defaultCoverImage = process.env.DEFAULT_COVER_IMAGE;

        const isValidProfilePicture = await validateImageURL(profilePicture);
        if (!isValidProfilePicture) {
            profilePicture = defaultProfilePicture;
        }

        const isValidCoverImage = await validateImageURL(coverImage);
        if (!isValidCoverImage) {
            coverImage = defaultCoverImage;
        }

        user.username = username;
        user.fullName = fullName;
        user.email = email;
        user.bio = bio;

        if (user.profilePicture !== profilePicture) {
            const imgId = user.profilePicture.split("/").pop().split(".")[0];
            await v2.uploader.destroy(imgId);
            const upload = await v2.uploader.upload(profilePicture);
            user.profilePicture = upload.secure_url;
        }

        if (user.coverImage !== coverImage) {
            const imgId = user.coverImage.split("/").pop().split(".")[0];
            await v2.uploader.destroy(imgId);
            const upload = await v2.uploader.upload(coverImage);
            user.coverImage = upload.secure_url;
        }

        await user.save(); 

        res.status(200).json({ message: "User Profile edited successfully" });
    } catch (error) {
        console.log("Error in editProfile controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function followUser(req, res) {
    try {
        currentlyLoggedUser=req.user._id;
        const { id: userId } = req.params;
        console.log(userId)

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userAlreadyFollows = user.followers.includes(currentlyLoggedUser);

        if (userAlreadyFollows) {
            await User.updateOne({ _id: currentlyLoggedUser }, { $pull: { following: userId } });
            await User.updateOne({ _id: userId }, { $pull: { followers: currentlyLoggedUser } });

            res.status(200).json({ followed: false });
        } else {
            await User.updateOne({ _id: userId }, { $push: { followers: currentlyLoggedUser } });
            await User.updateOne({ _id: currentlyLoggedUser }, { $push: { following: userId } });

            res.status(200).json({ followed: true });
        }
    } catch (error) {
        console.log("Error in followUser controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function followingStatus(req, res) {
    try {
        const currentlyLoggedUser = req.user._id;
        // console.log(currentlyLoggedUser)
        const { id: userId } = req.params;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const followed = user.followers.map(follower => follower.toString()).includes(currentlyLoggedUser.toString());
        res.status(200).json({ followed });
    } catch (error) {
        console.error("Error in getFollowStatus controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    likePost,
    getLikeStatus,
    bookmarkPost,
    getBookmarkStatus,
    editProfile,
    followUser,
    followingStatus
}