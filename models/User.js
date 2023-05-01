const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required:true,
        type:Number
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    interest:String,
    bio:String,
    avatarUrl:String

})

module.exports = mongoose.model("UserModel", UserSchema)