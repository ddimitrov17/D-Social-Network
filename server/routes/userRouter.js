const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { likePost, getLikeStatus, getBookmarkStatus, bookmarkPost, editProfile } = require('../controllers/userController');

const userRoutes = express.Router();


userRoutes.get("/:id/status", isUserLogged, getLikeStatus);
userRoutes.post("/like/:id", isUserLogged, likePost);
userRoutes.get('/bookmarkstatus/:id', isUserLogged, getBookmarkStatus);
userRoutes.post('/bookmark/:id', isUserLogged, bookmarkPost);
userRoutes.put('/edit-profile', isUserLogged, editProfile);

module.exports = {
    userRoutes
}