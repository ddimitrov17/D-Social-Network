const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts, getPostById } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all',getAllPosts);
postRoutes.get('/:id',getPostById);
postRoutes.post('/create',isUserLogged,createPost);


module.exports = {
    postRoutes
}