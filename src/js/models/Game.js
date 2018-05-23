import axios from 'axios';

export default class Game {
    constructor () {
        this.activeTeam = 'home';
        this.summary = {
            game: 
                {
                gameID: 'TODOLATER',
                period: 'Q1',
                homeSummary: {
                    score: 0,
                    fouls: 0,
                    timeouts: 0,
                    techs: 0,
                    teamID:''
                },
                guestSummary: {
                    score: 0,
                    fouls: 0,
                    timeouts: 0,
                    techs: 0,
                    teamID: ''
                }
            }
        };
        this.activity = {
            gameID: 'TODOLATER',
            activities: [
                {
                    id:0,
                    period: '',
                    teamID: '',
                    playerID: '',
                    activityType: '',
                    overwrite: ''
                }
            ]
        };

    }


}