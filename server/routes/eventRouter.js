const express = require('express');
const { isUserLogged } = require('../middleware/routeGuards');
const { eventCreate, getAllEvents, goingToAnEvent, interestedInAnEvent, getGoingAndInterestedStatus } = require('../controllers/eventController');

const eventRoutes = express.Router();

eventRoutes.post('/create-event', isUserLogged, eventCreate);
eventRoutes.get('/all-events', getAllEvents);
eventRoutes.post('/going/:id',isUserLogged,goingToAnEvent);
eventRoutes.post('/interested/:id',isUserLogged,interestedInAnEvent)
eventRoutes.get('/event-status/:id',isUserLogged,getGoingAndInterestedStatus)

module.exports = {
    eventRoutes
}