const jwt = require("jsonwebtoken");

function generateTokenAndSetCookie(userId, username,res) {
    const payload = {
        id: userId,
        username: username
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
    });
};

module.exports = {
    generateTokenAndSetCookie
}