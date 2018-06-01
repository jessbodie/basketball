import axios from 'axios';

export default class Team {
    // constructor () {
    // } // TODO 
    async getTeam(id) {
        try {
            const res = await axios.get(`http://localhost:3000/teams/${id}`);
            this.id = id;
            this.name = res.data.team.name;
            this.players = res.data.team.players;
        } catch (err) {
            console.log(err);
        }
    }

   
}


