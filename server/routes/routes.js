const path = require('path');
const express = require('express');
const router = express.Router();

const { Team } = require('../models/team'); 
//TODO const { Game } = require('./models/game'); 


router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  // TODO SENDING WRONG FILE, WRONG DIRECTORY is CONST PATH NECESSARY
// router.get('/', function(req, res) {
//     res.sendFile(__dirname + '/dist/index.html');
//   });
  
router.get('/', function(req, res) {
    res.json({ message: 'hooray!' });
    // res.send('show homepage'); // TODO
  });

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

module.exports = router;
