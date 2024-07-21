const express = require('express');
const { signup, login } = require('../controllers/authController');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost } = require('../controllers/postController');

const authRoutes = express.Router();

authRoutes.get('/signup', (req, res) => {
    res.json({
        data: "You hit the signup endpoint"
    })
})

authRoutes.post('/signup',signup);
authRoutes.post('/login',login);

module.exports = {
    authRoutes
} 