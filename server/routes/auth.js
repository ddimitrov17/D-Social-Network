const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({
        data: "You hit the signup endpoint"
    })
})

router.post('/signup',signup);
router.post('/login',login);

module.exports = {
    router
} 