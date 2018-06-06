import axios from 'axios';

const activityLookUp = [
    ["fg", { increment: 2, summaryField: "score", summaryDOMid: "sb__score--" }],
    ["3p", { increment: 3, summaryField: "score", summaryDOMid: "sb__score--" }],
    ["fs", { increment: 1, summaryField: "score", summaryDOMid: "sb__score--" }],
    ["pf", { increment: 1, summaryField: "fouls", summaryDOMid: "sb__fouls--" }],
    ["tech", { increment: 1, summaryField: "techs", summaryDOMid: "sb__tech--" }],
    ["to", { increment: 1, summaryField: "timeouts", summaryDOMid: "sb__to--" }]
];

// Define foul limits which vary by league
const bonus = {
    single: 6,
    double: 10
};

export default class Game {
    constructor () {
        this.activeTeam = 'home';
        this.summary = {
            gameID: '', //TODO
            period: 'Q1',
            home: {
                score: 0,
                fouls: 0,
                timeouts: 0,
                techs: 0,
                teamID:'' // TODO DELETE?
            },
            guest: {
                score: 0,
                fouls: 0,
                timeouts: 0,
                techs: 0,
                teamID: ''
            }
        };
        this.activity = {
            gameID: '', //TODO
            activities: [
                {
                    id:0, //TODO
                    period: '',
                    teamID: '',
                    playerID: '',
                    activityType: '',
                    overwrite: ''
                }
            ]
        };

    }

    // Set the teamIDs for both teams 
    setTeamIDs(homeID, guestID) {
        this.summary.home.teamID = homeID;
        this.summary.guest.teamID = guestID;
    }
    
    // Return which team is currently active / which tab is in foreground
    getActiveTeam() {
        return this.activeTeam;
    }

    setActiveTeam(team) {
        this.activeTeam = team;
    }

    // Persist each new activity 
    async saveActivity(period, teamID, playerID, activityType, overwrite) {
        try {
            const activity = await axios.post(`http://localhost:3000/activity`, {
                period: period,  
                teamID: teamID, 
                playerID: playerID,
                activityType: activityType,
                overwrite: overwrite
            });
        } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log('Request: ', error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }
    }

    // Persist the game summary  
    async saveSummary(gameID, teamStatus, type, val) {
        // TODO: gameID
        
        try {
            const activity = await axios.put(`http://localhost:3000/game`, {
                gameID: gameID,
                type: type,
                val: val, 
                teamStatus: teamStatus
            });
        } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log('Request: ', error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }
        }                
    // Depending on activity type, 
    // return new corresponding amount to display in player field
    processVal(type, curField) {
        let curAmt = Number(document.getElementById(curField).value);
        if (isNaN(curAmt)) {
            curAmt = 0;
            curAmt = parseInt(curAmt, 10);
        } else {
            curAmt = parseInt(curAmt, 10);
        }

        for (let t of activityLookUp) {
            if (type === t[0]) {
                let amt = (t[1].increment);
                let newVal = curAmt + amt;
                return newVal;
                }   
        }
    }
        
    // Depending on activity type and team, 
    // update data summary object and
    // return new corresponding summary amount and element
    updateSummary(team, type, changeVal) {
        for (let t of activityLookUp) {
            if (type === t[0]) {
                // Check if overwrite (from text input field), use change in value
                let amt;
                if (isNaN(changeVal)) {
                    amt = (t[1].increment);
                } else {
                    amt = changeVal;
                }

                let sumField = (t[1].summaryField);
                let sumDOM = (t[1].summaryDOMid);

                this.summary[team][sumField] = this.summary[team][sumField] + amt;

                let sumTot = this.summary[team][sumField];
                sumDOM = sumDOM + team;
                return [sumTot, sumDOM];

            }   
        }
    }

    // Return the activity's DOM field
    getActivityLookUp(type) {
        for (let t of activityLookUp) {
            if (type === t[0]) {
                // let amt = (t[1].increment);
                let summaryField = (t[1].summaryField);
                return summaryField;
                }   
            }
    }





    
    
    
    
    
    
    
    // TODO
    async getActivities(id) {
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


    // Reset the fouls for both teams 
    resetFouls() {
        this.summary.home.fouls = 0;
        this.summary.guest.fouls = 0;
    }
    
    // Set the period 
    setPeriod(per) {
        this.summary.period = per;
    }

    // Return Bonus object (largely static) 
    getBonus() {
        return bonus;
    }

    // // Return the game's summary data for the active team
    // getTeamSummary(team) {
    //     String(team);
    //     let summaryString = 'summary.' + String(team);
    //     return (eval(summaryString));
    // }    
}