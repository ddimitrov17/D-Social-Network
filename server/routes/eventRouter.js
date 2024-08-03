const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { eventCreate, getAllEvents } = require('../controllers/eventController');

const eventRoutes = express.Router();

eventRoutes.post('/create-event', isUserLogged, eventCreate);
eventRoutes.get('/all-events', getAllEvents);

module.exports = {
    eventRoutes
}