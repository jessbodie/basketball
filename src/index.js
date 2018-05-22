console.log('Started');
import Ball from './js/models/Ball'; // TODO
import Team from './js/models/Team';
import * as teamView from './js/views/teamView';
import * as ballView from './js/views/ballView';
import * as base from './js/views/base';
import './scss/main.scss';
require.context('./img/favicon', false, /^\.\//);

const state = {};

const controller = async () => {

    state.teamHome = new Team();
    state.teamGuest = new Team();


    const toggleHomeGuest = (team) => {
        ballView.toggleTabs(team);
        state.ball.getActiveTeam(team);
    };

    // Show "basic" data (Team Name, Roster)     
    const showBasicData = () => {
        // Display Team Names
        teamView.showDisplayText("team-name--home", state.teamHome.name);
        teamView.showDisplayText("team-name--guest", state.teamGuest.name);
        

        // Display Rosters and table rows for Home and Guest teams
        function showRoster (teamToggle, teamID, teamRoster) {
            console.log('teamRoster: ', teamRoster);
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

        state.ball.updateSummaryIDs(state.teamHome.id, state.teamGuest.id);


        // Update Scoreboard elements with team-specific IDs
        document.getElementById("-home-to-in").id = state.teamHome.id + "-home-to-in";
        document.getElementById("-home-to-btn").id = state.teamHome.id + "-home-to-btn";
        document.getElementById("-home-tech-in").id = state.teamHome.id + "-home-tech-in";
        document.getElementById("-home-tech-btn").id = state.teamHome.id + "-home-tech-btn";
        document.getElementById("-guest-to-in").id = state.teamGuest.id + "-guest-to-in";
        document.getElementById("-guest-to-btn").id = state.teamGuest.id + "-guest-to-btn";
        document.getElementById("-guest-tech-in").id = state.teamGuest.id + "-guest-tech-in";
        document.getElementById("-guest-tech-btn").id = state.teamGuest.id + "-guest-tech-btn";


        // // Score Keeping Buttons/Inputs  Event Listeners
        // SKEventListeners();

        // // Reset splash animation so it only shows on first load
        // ballView.splashAnimation();
    };


    try {
        await state.teamHome.getTeam('5aff7685dd75d934b37cacaf');
        console.log('teamHome: ', state.teamHome);
        await state.teamGuest.getTeam('5aff770384c0b334d87688f3');
        console.log('teamGuest: ', state.teamGuest);
        showBasicData();
    } catch (err) {
        console.log(err);
    }



    // Event listeners
    const setupEventListeners = () => {

        // When Home or Guest tab is clicked, update flag and UI
        document.getElementById("sb__tab--home").addEventListener("click", function() {
            toggleHomeGuest("home");
        });
        document.getElementById("sb__tab--guest").addEventListener("click", function() {
            toggleHomeGuest("guest");
        });

        // When Period clicked, add Period to Activity object and update UI
        periodsList = document.querySelectorAll(".period__num");
        for (let i = 0; i < periodsList.length; i++) {
            periodsList[i].children[1].addEventListener("click", function(e) {
                state.ball.updatePeriod(e.currentTarget.textContent);
            });
        };

        // When Period 3 is clicked, reset Team Fouls and Bonus Indicators
        document.getElementById("period__num--3").addEventListener("click", function() {
            state.ball.updateSummaryFouls();
            ballView.showDisplayText("sb__bb--home", "");
            ballView.showDisplayText("sb__bb--guest", "");
            ballView.showDisplayText("sb__fouls--home", "");
            ballView.showDisplayText("sb__fouls--guest", "");
        });
    };
        
    // Listen for button clicks in Score Keeping and send the input for processing
    // Called after JSON loaded
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
        document.getElementById("sb__tab--guest").addEventListener("click", ballView.removeSKAnimation);
    };

    // Core function to process the inputs from buttons and text fields
    // overWriteValue and prevValue needed for text input fields only
    const process = (input, overWriteValue, prevValue) => {
        // Change input activity to an array
        var newActivityArr = input.split("-");
        // console.log(newActivityArr);
                
        // 1 - Save each individual activity
        var allActivities = state.ball.saveActivity(newActivityArr, overWriteValue);
        // console.log(allActivities);
        var activityType = newActivityArr[2];
        var playerID = newActivityArr[1];
        var team = newActivityArr[0];
        var changeInValue = overWriteValue - prevValue;

        // 2 - For each activity, update Score Board Summary data and Score Board UI
        var activityOutput = state.ball.updateSummary(team, activityType, changeInValue); 
        var amtSB = activityOutput[0];
        var elSB = activityOutput[1];
        if ((activityType == "fg") || (activityType == "3p") ||
            (activityType == "fs") || (activityType == "pf")) {
            ballView.showDisplayText(elSB, amtSB);
        };

        // 2B - For each foul, check and update Score Board Bonus Indicator
        if (activityType == "pf") {
            updateBB();
        };


        // 3 - If button clicked and not overwrite from text input,
        // for each activity, update corresponding player's edit field
        if (overWriteValue === undefined) {
            var elPlayerActivity = input.replace("btn", "in");
            var amtPlayerActivity = state.ball.updatePlayerActivity(activityType, elPlayerActivity); 
            amtPlayerActivity = parseInt(amtPlayerActivity, 10);
            ballView.showFieldText(elPlayerActivity, amtPlayerActivity);
        }
    };

    // Check and update Score Board Bonus Indicator
    const updateBB = () => {
            // Get the number of team fouls for the active team
            var t = state.ball.getActiveTeam();
            var teamSummary = state.ball.getTeamSummary(t);

            // Get bonus limits
            var b = state.ball.getBonus();

            // Bonus displays for the not active team
            if (t === "home") {
                var bbDisplay = "guest"; 
            } else {
                var bbDisplay = "home";
            }
            //  If over first bonus limit display B for Bonus situation
            if (teamSummary.fouls === b.single) {
                ballView.showDisplayText("sb__bb--"+bbDisplay, "B");
            }
            //  If over second bonus limit display BB for Double Bonus
            if (teamSummary.fouls === b.double) {
                ballView.showDisplayText("sb__bb--"+bbDisplay, "BB");
            }
    
            // reset at half time, overtime
    };
    


    try {
        // Initiate getting data from JSON
        setupEventListeners();

        // Reset the values for the Score Board Time Out and Techs
        document.getElementById("-home-to-in").value="";
        document.getElementById("-home-tech-in").value="";
        document.getElementById("-guest-to-in").value="";
        document.getElementById("-guest-tech-in").value="";


        // Set Home as default on start
        toggleHomeGuest('home');


    } catch (err) {
        console.log(err);
    }

    return;
}

window.addEventListener('load', controller);

