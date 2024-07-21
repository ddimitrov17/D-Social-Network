const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all',getAllPosts);
postRoutes.post('/create',isUserLogged,createPost);


module.exports = {
    postRoutes
}