const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const CommentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorAvatar: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: Date
})

module.exports = mongoose.model("CommentModel", CommentSchema)