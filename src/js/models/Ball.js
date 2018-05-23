export default class Ball {
    
    // Return the game's summary data for the active team
    getTeamSummary(team) {
        String(team);
        var summaryString = "summary." + String(team) + "Summary";
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
 
}    
