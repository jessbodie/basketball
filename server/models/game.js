const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
    period: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    home: {
        hTeamID: {
            type: String,
            required: true,
            trim: true
        },     
        score: {
            type: Number,
            required: false,
            trim: true
        },     
        fouls: {
            type: Number,
            required: false,
            trim: true
        },     
        timeouts: {
            type: Number,
            required: false,
            trim: true
        },     
        techs: {
            type: Number,
            required: false,
            trim: true
        } 
    },
    guest: {
        teamID: {
            type: String,
            required: true,
            trim: true
        },     
        score: {
            type: Number,
            required: false,
            trim: true
        },     
        fouls: {
            type: Number,
            required: false,
            trim: true
        },     
        timeouts: {
            type: Number,
            required: false,
            trim: true
        },     
        techs: {
            type: Number,
            required: false,
            trim: true
        } 
    }
});

module.exports = { 
    Game: Game
};