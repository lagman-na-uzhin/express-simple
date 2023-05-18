const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const CommentSchema = new Schema({
    author: {
        firstname: String,
        lastname: String,
        avatar: String,
        authorid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    },
    text: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("CommentModel", CommentSchema)