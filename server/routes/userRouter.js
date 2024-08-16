const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { likePost, getLikeStatus, getBookmarkStatus, bookmarkPost, editProfile, followUser, followingStatus } = require('../controllers/userController');

const userRoutes = express.Router();


userRoutes.get("/:id/status", isUserLogged, getLikeStatus);
userRoutes.post("/like/:id", isUserLogged, likePost);
userRoutes.get('/bookmarkstatus/:id', isUserLogged, getBookmarkStatus);
userRoutes.post('/bookmark/:id', isUserLogged, bookmarkPost);
userRoutes.put('/edit-profile', isUserLogged, editProfile);
userRoutes.post('/follow/:id',isUserLogged,followUser);
userRoutes.get('/follow-status/:id',isUserLogged,followingStatus)

module.exports = {
    userRoutes
}