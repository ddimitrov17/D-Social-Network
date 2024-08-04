const { Event } = require("../models/eventModel");
const { User } = require("../models/userModel");
const { v2 } = require('cloudinary');

async function eventCreate(req, res) {
    try {
        console.log(req.body)
        let { name, description, img, date, location, going, interested } = req.body;
        const userId = req.user.id.toString();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!name || !description || !img || !date || !location) {
            return res.status(400).json({ error: "All fields are required in order to create an event" });
        }

        const upload = await v2.uploader.upload(img);
        img = upload.secure_url;

        const newEvent = new Event({
            creator: userId,
            name,
            description,
            img,
            date,
            location,
            going,
            interested
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.log("Error in createEvent controller: ", error);
    }
};

async function getAllEvents(req, res) {
    try {
        const events = await Event.find()
            .sort({ createdAt: -1 });
        if (events.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(events);
    } catch (error) {
        console.log("Error in getAllEvents controller", error);
    }
}

async function goingToAnEvent(req, res) {
    try {
        const userId = req.user._id;
        const { id: eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        event.going.push(userId);
        await event.save();

        res.status(200).json(event)
    } catch (error) {
        console.log("Error in eventPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function interestedInAnEvent(req, res) {
    try {
        const userId = req.user._id;
        const { id: eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        event.interested.push(userId);
        await event.save();

        res.status(200).json(event)
    } catch (error) {
        console.log("Error in eventPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function getGoingAndInterestedStatus(req, res) {
    try {
        const userId = req.user._id;
        const { id: eventId } = req.params;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const event = await Event.findById(eventId);

        const going = event.going.includes(userId);
        const interested = event.interested.includes(userId);
        res.status(200).json({ going,interested });
    } catch (error) {
        console.error("Error in getGoingAndInterestedStatus controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    eventCreate,
    getAllEvents,
    goingToAnEvent,
    interestedInAnEvent,
    getGoingAndInterestedStatus
}