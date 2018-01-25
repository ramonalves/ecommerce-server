const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    password: { 
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
});

module.exports = mongoose.model('User', User);
