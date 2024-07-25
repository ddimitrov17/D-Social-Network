const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts, getPostById, commentOnPost, likePost, getLikeStatus } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all',getAllPosts);
postRoutes.get('/:id',getPostById);
postRoutes.post('/comment/:id',isUserLogged,commentOnPost);
postRoutes.post('/create',isUserLogged,createPost);
postRoutes.post("/like/:id", isUserLogged, likePost);
postRoutes.get("/:id/status",isUserLogged,getLikeStatus)


module.exports = {
    postRoutes
}