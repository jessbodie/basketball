import Team from './js/models/Team';
import Game from './js/models/Game'; // TODO
import * as teamView from './js/views/teamView';
import * as gameView from './js/views/gameView';
import * as base from './js/views/base';
import './scss/main.scss';
require.context('./img/favicon', false, /^\.\//);

const state = {};

const setupEventListeners = () => {
    // When Home or Guest tab is clicked, update flag and UI
    document.getElementById('sb__tab--home').addEventListener('click', function() {
        base.toggleTabs('home'); 
        state.game.activeTeam = 'home';
    });
    document.getElementById('sb__tab--guest').addEventListener('click', function() {
        base.toggleTabs('guest');
        state.game.activeTeam = 'guest';
        });

    // When Period clicked, add Period to Activity object and update UI
    const periodsList = document.querySelectorAll('.period__num');
    for (let i = 0; i < periodsList.length; i++) {
        periodsList[i].children[1].addEventListener('click', function(e) {
            state.game.setPeriod(e.currentTarget.textContent);
        });
    };

    // When Period 3 is clicked, reset Team Fouls and Bonus Indicators
    document.getElementById('period__num--3').addEventListener('click', function() {
        state.game.resetFouls();
        base.showDisplayText('sb__bb--home', '');
        base.showDisplayText('sb__bb--guest', '');
        base.showDisplayText('sb__fouls--home', '');
        base.showDisplayText('sb__fouls--guest', '');
    });
};

// TODO
// Check and update Score Board Bonus Indicator
const updateBB = () => {
    // // Get the number of team fouls for the active team
    // var t = state.game.getActiveTeam();
    // var teamSummary = state.game.getTeamSummary(t);

    // // Get bonus limits
    // var b = state.game.getBonus();

    // // Bonus displays for the not active team
    // if (t === "home") {
    //     var bbDisplay = "guest"; 
    // } else {
    //     var bbDisplay = "home";
    // }
    // //  If over first bonus limit display B for Bonus situation
    // if (teamSummary.fouls === b.single) {
    //     base.showDisplayText("sb__bb--"+bbDisplay, "B");
    // }
    // //  If over second bonus limit display BB for Double Bonus
    // if (teamSummary.fouls === b.double) {
    //     base.showDisplayText("sb__bb--"+bbDisplay, "BB");
    // }

    // // reset at half time, overtime // TODO
};


// Core function to process the inputs from buttons and text fields
// overWriteValue and prevValue needed for text input fields only
const process = (input, overWriteValue, prevValue) => {
    let period = state.game.summary.period;
    console.log('period: ', period);
    // Parse input activity
    let newActivityArr = input.split("-");
    console.log('newActivityArr from index/process: ', newActivityArr);
    let team = newActivityArr[0];
    let playerID = newActivityArr[1];
    let activityType = newActivityArr[2];
    let changeInValue = overWriteValue - prevValue;
    if (overWriteValue === undefined) {
        overWriteValue = false;
    }

    state.game.saveActivity(period, team, playerID, activityType, overWriteValue);
            
    // TODO
    // 2 - For each activity, update Score Board Summary data and Score Board UI
    var activityOutput = state.game.updateSummary(team, activityType, changeInValue); 
    var amtSB = activityOutput[0];
    var elSB = activityOutput[1];
    if ((activityType == "fg") || (activityType == "3p") ||
        (activityType == "fs") || (activityType == "pf")) {
            base.showDisplayText(elSB, amtSB);
    };

    // 2B - For each foul, check and update Score Board Bonus Indicator
    if (activityType == "pf") {
        updateBB();
    };

    // 3 - If button clicked and not overwrite from text input,
    // for each activity, update corresponding player's edit field
    if (overWriteValue === undefined) {
        var elPlayerActivity = input.replace("btn", "in");
        var amtPlayerActivity = state.game.updatePlayerActivity(activityType, elPlayerActivity); 
        amtPlayerActivity = parseInt(amtPlayerActivity, 10);
        gameView.showFieldText(elPlayerActivity, amtPlayerActivity);
    }
};

// Listen for button clicks in Score Keeping and send the input for processing
const SKEventListeners = () => {
    // Listen for Plus Button clicks, then process that Input
    var btnList = document.querySelectorAll(".btn-edit");
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener("click", function() {
            process(btnList[i].id);
        });
    }

    // Listen for Edit Field updates, then process that Input
    var editFieldList = document.querySelectorAll(".field-edit");
    for (let i = 0; i < editFieldList.length; i++) {
        var prevValue;

        editFieldList[i].addEventListener("click", function() {
            // Select and focus where user taps
            editFieldList[i].select();
            editFieldList[i].focus();
            // Capture current value
            prevValue = editFieldList[i].value;

        });

        // Process after field is blurred
        editFieldList[i].addEventListener("blur", function() {
            process(editFieldList[i].id, editFieldList[i].value, prevValue);
        });

        // Process after press Enter key
        editFieldList[i].addEventListener("keypress", function(e) {
            if ((e.keyCode === 13) || (e.keyCode === 9)) {
                e.preventDefault();
                process(editFieldList[i].id, editFieldList[i].value, prevValue);
                prevValue = editFieldList[i].value;
                editFieldList[i].blur();
            }
        });
    }

    // Remove animation after it loads once for Home and Guest Tabs
    document.getElementById("sb__tab--guest").addEventListener("click", teamView.removeSKAnimation);
};

const controller = async () => {

    // Show "basic" data (Team Name, Roster)     
    const showBasicData = () => {
        base.toggleTabs('home');
        // Display Team Names
        console.log(state.teamHome);
        base.showDisplayText("team-name--home", state.teamHome.name);
        base.showDisplayText("team-name--guest", state.teamGuest.name);
        
        // Display Rosters and table rows for Home and Guest teams
        function showRoster (teamToggle, teamID, teamRoster) {
            // console.log('teamRoster: ', teamRoster);
            // console.log('teamToggle: ', teamToggle);
            // console.log('teamID: ', teamID);
            for (let i = 0; i < teamRoster.length; i++ ) {
                var playerID = teamRoster[i]._id;
                var playerFirst = teamRoster[i].first;
                var playerLast = teamRoster[i].last;
                var playerNumber = teamRoster[i].number;

                teamView.addPlayerRow(teamToggle, teamID, playerID, playerFirst, playerLast, playerNumber);
            }
        }

        showRoster("home", state.teamHome.id, state.teamHome.players);
        showRoster("guest", state.teamGuest.id, state.teamGuest.players);

        // Set team IDs in state
        state.game.setTeamIDs(state.teamHome.id, state.teamGuest.id); 

        // Update Scoreboard elements with team-specific IDs
        teamView.updateSBIDs('home', state.teamHome.id);
        teamView.updateSBIDs('guest', state.teamGuest.id);

        // Score Keeping Buttons/Inputs  Event Listeners
        SKEventListeners();

        // Reset splash animation so it only shows on first load
        teamView.splashAnimation();


    };



    


    try {
        state.teamHome = new Team();
        state.teamGuest = new Team();
        state.game = new Game();
   
        await state.teamHome.getTeam('5b061af753c3dd2187a96174');
        // console.log('teamHome: ', state.teamHome);
        await state.teamGuest.getTeam('5b061be553c3dd2187a96177');
        // console.log('teamGuest: ', state.teamGuest);
        showBasicData();
        setupEventListeners();


        // TODO - WHEN IS THIS NECESSARY? //unclear
        // Reset the values for the Score Board Time Out and Techs
        // document.getElementById("-home-to-in").value="";
        // document.getElementById("-home-tech-in").value="";
        // document.getElementById("-guest-to-in").value="";
        // document.getElementById("-guest-tech-in").value="";

    } catch (err) {
        console.log(err);
    }


    return;
}

window.addEventListener('load', controller);

