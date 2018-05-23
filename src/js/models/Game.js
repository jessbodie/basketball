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
            gameID: 'TODOLATER',
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
            gameID: 'TODOLATER',
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

    // Reset the fouls for both teams 
    setTeamIDs(homeID, guestID) {
        this.summary.home.teamID = homeID;
        this.summary.guest.teamID = guestID;
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

    // Add each new activity to activity object
    // Take ID from button, convert to array and then object
    saveActivity(newActiv, val) {
        console.log('activity.activities: ', this.activity.activities);
        var activCurrLength = this.activity.activities.length;
        var newActivityObj = {
            id:((this.activity.activities[activCurrLength - 1].id) + 1),
            period: this.summary.period,
            teamID: newActiv[0],
            playerID: newActiv[1],
            activityType: newActiv[2],
            overwrite: val
        };
        this.activity.activities.push(newActivityObj);
        console.log(newActivityObj);

        return this.activity.activities;
    }

    // Depending on activity type and team, 
    // update data summary object and
    // return new corresponding summary amount and element
    updateSummary(team, type, changeVal) {
        for (let t of activityLookUp) {
            if (type === t[0]) {
                // Check if overwrite (from text input field), use change in value
                if (isNaN(changeVal)) {
                    var amt = (t[1].increment);
                } else {
                    var amt = changeVal;
                }

                var sumField = (t[1].summaryField);
                var sumDOM = (t[1].summaryDOMid);
                var sumTot;
                console.log('!!!team: ', team);
                if (team === this.summary.home.teamID) {
                    this.summary.home[sumField] = this.summary.home[sumField] + amt;
                    sumTot = this.summary.home[sumField];
                    sumDOM = sumDOM + "home";
                } else {
                    this.summary.guest[sumField] = this.summary.guest[sumField] + amt;
                    sumTot = this.summary.guest[sumField];
                    sumDOM = sumDOM + "guest";
                }
            }   
        }
        return [sumTot, sumDOM];
    }


    
        // Depending on activity type, 
    // return new corresponding amount to display in player field
    updatePlayerActivity(type, el) {
        var curAmt = document.getElementById(el).value;
        curAmt = Number(curAmt);
        console.log('curAmt: ', curAmt);
        if (isNaN(curAmt)) {
            curAmt = 0;
            curAmt = parseInt(curAmt, 10);
        } else {
            curAmt = parseInt(curAmt, 10);
        }


        for (let t of activityLookUp) {
            if (type === t[0]) {
                let amt = (t[1].increment);
                var newAmt = curAmt + amt;
                }   
        }
        return newAmt;
    }

    // Return which team is currently active / which tab is in foreground
    getActiveTeam(team) {
        if (team) {
            this.activeTeam = team;
        }
        return this.activeTeam;
    }
 
    // Return the game's summary data for the active team
    getTeamSummary(team) {
        String(team);
        let summaryString = 'summary.' + String(team);
        return (eval(summaryString));
    }

    // Return Bonus object (largely static) 
    getBonus() {
        return bonus;
    }
    
    // Return the activityLookUp
    getActivityLookUp() {
        console.log(activityLookUp);
        return activityLookUp;
    }
    
}