const express = require('express');
const { signup, login, logout, getCurrentUser } = require('../controllers/authController');
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
authRoutes.get('/logout',logout);
authRoutes.get('/current',isUserLogged,getCurrentUser);

module.exports = {
    authRoutes
} 