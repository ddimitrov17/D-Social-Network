const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { createPost, getAllPosts, getPostById, commentOnPost, deletePost, editPost, getTopThreePosts, getProfile, postExplore } = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.get('/all', getAllPosts);
postRoutes.get('/explore', postExplore);
postRoutes.get('/:id', getPostById);
postRoutes.post('/comment/:id', isUserLogged, commentOnPost);
postRoutes.post('/create', isUserLogged, createPost);
postRoutes.delete('/delete/:id', isUserLogged, deletePost);
postRoutes.put('/edit/:id', isUserLogged, editPost);
postRoutes.get('/home/top', getTopThreePosts);
postRoutes.get('/profile/:username', getProfile);


module.exports = {
    postRoutes
}