const mongoose = require('mongoose');

const Activity = mongoose.model('Activity', {
    period: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    teamID: {
        type: String, //TODO
        required: true,
        minlength: 1,
        trim: true
    },
    playerID: {
        type: String, //TODO
        required: true,
        minlength: 1,
        trim: true
    },
    activityType: {
        type: String, 
        required: true,
        minlength: 1,
        trim: true
    },
    overwrite: {
        type: Boolean, 
        required: false,
        minlength: 1,
        trim: true
    }
});

module.exports = { 
    Activity: Activity
};