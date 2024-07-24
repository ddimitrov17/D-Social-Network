const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts, getPostById, commentOnPost } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all',getAllPosts);
postRoutes.get('/:id',getPostById);
postRoutes.post('/comment/:id',isUserLogged,commentOnPost);
postRoutes.post('/create',isUserLogged,createPost);


module.exports = {
    postRoutes
}