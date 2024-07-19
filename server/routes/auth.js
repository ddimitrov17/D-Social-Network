const express = require('express');
const { signup } = require('../controllers/authController');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({
        data: "You hit the signup endpoint"
    })
})

router.post('/signup',signup);

module.exports = {
    router
} 