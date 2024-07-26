const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts, getPostById, commentOnPost, likePost, getLikeStatus, deletePost, editPost } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all',getAllPosts);
postRoutes.get('/:id',getPostById);
postRoutes.post('/comment/:id',isUserLogged,commentOnPost);
postRoutes.post('/create',isUserLogged,createPost);
postRoutes.post("/like/:id", isUserLogged, likePost);
postRoutes.get("/:id/status",isUserLogged,getLikeStatus);
postRoutes.delete('/delete/:id',isUserLogged,deletePost);
postRoutes.put('/edit/:id',isUserLogged,editPost);

module.exports = {
    postRoutes
}