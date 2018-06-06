const path = require('path');
const express = require('express');
const router = express.Router();

const { Team } = require('../models/team'); 
const { Game } = require('../models/game'); 
const { Activity } = require('../models/activity'); 


router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Max-Age', 7200); // Caching 
    // console.log('Time: ', Date.now());
    next();
  });

// TODO SENDING WRONG FILE, WRONG DIRECTORY is CONST PATH NECESSARY
// router.get('/', function(req, res) {
//     res.sendFile(__dirname + '/dist/index.html');
//   });
  
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray!' });
//     // res.send('show homepage'); // TODO
//   });


///////////////////  
// Route: /teams //
///////////////////  
router.post('/teams', async (req, res) => {
    try {
        var team = new Team({
                name: req.body.name, 
                coach: req.body.coach, 
                players: req.body.players
            });
        
            const doc = await team.save();
            res.send(doc);
        } catch (e) {
            res.status(400).send(e);
        };
    });
   
router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json({
            teams:teams
        });
    } catch (err) {
        res.status(400).send(err);
        }
    });

router.get('/teams/:id', async (req, res) => {
 
    try {
        let id = req.params.id;
        const team = await Team.findById(id);
        if (!team) {
            res.status(404).send(`Team not found with ID ${id}.`);
        }
        res.json({
            team:team
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

//////////////////////
// Route: /activity //
//////////////////////
router.post('/activity', async (req, res) => {
    try {
            let activity = new Activity({
                period: req.body.period, 
                teamID: req.body.teamID, 
                playerID: req.body.playerID,
                activityType: req.body.activityType,
                overwrite: req.body.overwrite
            });
        
            let doc = await activity.save();
            res.json(doc);
        } catch (e) {
            res.status(400).send(e);
        };
    });

router.get('/activity', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json({
            activities: activities
        });
    } catch (err) {
        res.status(400).send(err);
        }
    });

    // Get Activities for a team
router.get('/activity/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const activity = await Activity.find({ teamID : id });
        if (!activity) {
            res.status(404).send(`Team with ID ${id} has no activities.`);
        }
        res.json({
            activity:activity
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

//////////////////
// Route: /game //
//////////////////
router.post('/game', async (req, res) => {
    try {
            let game = new Game({
                period: req.body.period, 
                home: req.body.home, 
                guest: req.body.guest,
            });
        
            let doc = await game.save();
            res.send(doc);
        } catch (e) {
            res.status(400).send(e);
        };
    });

router.get('/game', async (req, res) => {
    try {
        const game = await Game.find();
        res.json({
            game: game
        });
    } catch (err) {
        res.status(400).send(err);
        }
    });

// Update Game Summary stats for home or away team
router.put('/game', async (req, res) => {
    try {
        let gameID = req.body.gameID; //TODO
        let type = req.body.type;
        let val = req.body.val;
        let teamStatus = req.body.teamStatus;
        const game = await Game.findOneAndUpdate({ _id: gameID }, 
                {[teamStatus + '.' + type]: val}, {new: true});

        if (!game) {
            res.status(404).send(`${gameID} not found.`);
        }
        res.json({
            game:game
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;
