import axios from 'axios';

export default class Team {
    constructor () {
        // this.id = id;
    }

    async getTeam(id) {
        try {
            const res = await axios.get(`http://localhost:3000/teams/${id}`);
            this.id = id;
            this.name = res.data.team.name;
            // console.log('team name: ', this.name);
            this.players = res.data.team.players;
            // console.log(this.players);
           
        } catch (err) {
            console.log(err);
        }
    }

    // Update the team IDs for home and guest in the data summary object
    updateSummaryIDs(homeTeamID, guestTeamID) {
        summary.game.homeSummary.teamID = homeTeamID;
        summary.game.guestSummary.teamID = guestTeamID;
    }
    
}


