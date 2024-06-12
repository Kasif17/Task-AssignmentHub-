const express = require('express');
const router = express.Router();
const { distributeUsers, toggleTopAstrologer, astrologers } = require('../services/flowDistribution');
const Astrologer = require('../models/astrologer');
const User = require('../models/user');

// Dummy data for illustration
astrologers.push(new Astrologer(1, 'Astrologer 1', true));
astrologers.push(new Astrologer(2, 'Astrologer 2'));
// Add more astrologers as needed

router.post('/distribute', (req, res) => {
    const users = req.body.users.map(user => new User(user.id, user.name));
    const updatedAstrologers = distributeUsers(users);
    res.json(updatedAstrologers);
});

router.post('/toggle', (req, res) => {
    const { astrologerId, isTopAstrologer } = req.body;
    toggleTopAstrologer(astrologerId, isTopAstrologer);
    res.sendStatus(200);
});

module.exports = router;
