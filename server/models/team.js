const mongoose = require('mongoose');

const Team = mongoose.model('Team', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    coach: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },     
    players: [
        {
            first: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },     
            last: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },     
            number: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 2,
                trim: true
            },     
            dob: {
                type: Date,
                required: false
            } 
        }
    ]

});

module.exports = { 
    Team: Team
};