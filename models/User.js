const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const UserSchema = new Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    age: {
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
    location: String,
    avatar:{
        name: String,
        filename: String,
        path: String
    }

})

module.exports = mongoose.model("UserModel", UserSchema)