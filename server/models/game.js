const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameStatsSchema = new Schema({ 
    teamID: {
        type: String,
        required: true,
        trim: true
    },     
    status: {
        type: String,
        required: false,
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
});


const gameSchema = new Schema({
    period: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    home: gameStatsSchema,
    guest: gameStatsSchema
});

const Game = mongoose.model('Game', gameSchema);

module.exports = { 
    Game: Game
};
