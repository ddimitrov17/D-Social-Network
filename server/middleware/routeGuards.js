const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

async function isUserLogged(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: "No Token Provided" });
        }

        const verification = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verification)
        if (!verification) {
            return res.status(400).json({ error: "Invalid Token"});
        }

        const user = await User.findById(verification.id).select("-password");
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in routeGuard middleware", error.message);
    }
}

module.exports = {
    isUserLogged
}