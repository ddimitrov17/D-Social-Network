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
        secure: true,
        sameSite: 'None',
        path: '/',
        domain: '.onrender.com',
        maxAge: 15 * 24 * 60 * 60 * 1000
    });
};

module.exports = {
    generateTokenAndSetCookie
}