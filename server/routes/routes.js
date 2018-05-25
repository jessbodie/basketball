const path = require('path');
const express = require('express');
const router = express.Router();

const { Team } = require('../models/team'); 
const { Game } = require('../models/game'); 
const { Activity } = require('../models/activity'); 


router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
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
            res.send(doc);
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

    // TODO
    // Update Game Summary data for a team
router.put('/game', async (req, res) => {
    try {
        console.log('req: ', req.body);
        let gameID = req.body.gameID;
        let teamID = req.body.teamID;
        let type = req.body.type;
        let amt = req.body.amt;
        let status = req.body.status;
        let query = String(status) + '.teamID';
        console.log(query);
        const game = await Game.findOneAndUpdate({ 
                _id: gameID,
                'home.teamID': teamID,
                period: 'YY'
            }, {'home.score': 88}, {new: true});
        // console.log(game);
        if (!game) {
            res.status(404).send(`${teamID} not found.`);
        }
        res.json({
            game:game
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;
