const { Schema, SchemaTypes, model } = require('mongoose');
const { User } = require('./userModel.js');

const eventSchema = new Schema(
    {
        creator: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        going: {
            type: Array,
            ref: "User",
            default: []
        },
        interested: {
            type: Array,
            ref: "User",
            default: []
        }
    }, { timestamps: true }
);

const Event = model("Event", eventSchema);

module.exports = {
    Event
};