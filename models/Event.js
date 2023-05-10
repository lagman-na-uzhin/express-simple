const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const EventSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
    },
    category: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{

        _id: mongoose.Schema.Types.ObjectId,
        name:String,
        profileUrl: String,
    }],
    tags: [String],
    imageUrl: [String],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

})

module.exports = mongoose.model("EventModel", EventSchema)