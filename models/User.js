const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    /* Avatar putting it here because we want to assign avatar when a user just sign up
     Without having setup his profile */
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now   // To automatically set Date
    }
}) 

module.exports = User = mongoose.model('user', UserSchema);