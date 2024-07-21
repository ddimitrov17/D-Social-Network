const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.post('/create',isUserLogged,createPost);


module.exports = {
    postRoutes
}