
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

var homeTeam;


export default class Ball {
    constructor() {
        this.activeTeam = "home";
        this.summary = {
            game: 
                {
                gameID: "TODOLATER",
                period: "Q1",
                homeSummary: {
                    score: 0,
                    fouls: 0,
                    timeouts: 0,
                    techs: 0,
                    teamID:""
                },
                guestSummary: {
                    score: 0,
                    fouls: 0,
                    timeouts: 0,
                    techs: 0,
                    teamID: ""
                }
            }
        };
        this.activity = {
            gameID: "TODOLATER",
            activities: [
                {
                    id:0,
                    period: "",
                    teamID: "",
                    playerID: "",
                    activityType: "",
                    overwrite: ""
                }
            ]
        };
    
    }

    // Return the game's summary data for the active team
    getTeamSummary(team) {
        String(team);
        var summaryString = "summary.game." + String(team) + "Summary";
        return (eval(summaryString));
    }

    // Return which team is currently active / which tab is in foreground
    getActiveTeam(team) {
        if (team) {
            this.activeTeam = team;
        }
        return this.activeTeam;
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

    // Get and return number in input field
    getFieldNum(elementID) {
        var el = document.getElementById(elementID);
        curAmt = Number(el.value);
        if (isNaN(curAmt)) {
            curAmt = 0;
            curAmt = parseInt(curAmt, 10);
        } else {
            curAmt = parseInt(curAmt, 10);
        }
        return curAmt;
    }
    
    
    // Add each new activity to activity object
    // Take ID from button, convert to array and then object
    saveActivity(newActiv, val) {
        var activCurrLength = activity.activities.length;
        var newActivityObj = {
            id:((activity.activities[activCurrLength - 1].id) + 1),
            period: summary.game.period,
            teamID: newActiv[0],
            playerID: newActiv[1],
            activityType: newActiv[2],
            overwrite: val
        };
        activity.activities.push(newActivityObj);
        console.log(newActivityObj);

        return activity.activities;
    }

    
    // // Update the team IDs for home and guest in the data summary object
    // updateSummaryIDs(homeTeamID, guestTeamID) {
    //     summary.game.homeSummary.teamID = homeTeamID;
    //     summary.game.guestSummary.teamID = guestTeamID;
    // }

    // Update the team IDs for home and guest in the data summary object
    updateSummaryFouls() {
        summary.game.homeSummary.fouls = 0;
        summary.game.guestSummary.fouls = 0;
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
                if (team === homeTeam) {
                    summary.game.homeSummary[sumField] = summary.game.homeSummary[sumField] + amt;
                    sumTot = summary.game.homeSummary[sumField];
                    sumDOM = sumDOM + "home";
                } else {
                    summary.game.guestSummary[sumField] = summary.game.guestSummary[sumField] + amt;
                    sumTot = summary.game.guestSummary[sumField];
                    sumDOM = sumDOM + "guest";
                }
            }   
        }
        // DEBUG
        // console.log(summary.game.homeSummary);
        // Return new sum total and the corresponding DOM element
        return [sumTot, sumDOM];
    }

    updatePeriod(per) {
        summary.game.period = per;
        console.log(summary.game);
    }

    // Depending on activity type, 
    // return new corresponding amount to display in player field
    updatePlayerActivity(type, el) {
        var curAmt = dataController.getFieldNum(el);
        for (let t of activityLookUp) {
            if (type === t[0]) {
                let amt = (t[1].increment);
                var newAmt = curAmt + amt;
                }   
        }
        return newAmt;
    }
}    
