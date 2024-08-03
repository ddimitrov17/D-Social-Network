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

module.exports = {
    eventCreate,
    getAllEvents
}