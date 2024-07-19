const { User } = require('../models/userModel.js');
const bcrypt = require('bcrypt');

async function signup(req, res) {
    try {
        console.log(req.body)
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
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    signup
}