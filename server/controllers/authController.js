const { User } = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { generateTokenAndSetCookie } = require('../services/generateToken.js');

async function signup(req, res) {
    try {
        const { username, email, fullName, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id.toString(), username, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email
            });
        } else {
            res.status(400).json({ error: "Invalid User data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        };
        generateTokenAndSetCookie(user._id.toString(), username, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.log('Error in login controller');
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(202).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
    }
};

async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate({
                path: "bookmarks",
                populate: {
                    path: "user",
                    select: "username fullName profilePicture"
                }
            });

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getCurrentUser controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    signup,
    login,
    logout,
    getCurrentUser
}