const express = require('express');
const router = express.Router();
const { Shift } = require('../models');

router.get('/', async (req, res) => {
    const listOfShifts = await Shift.findAll();
    res.json(listOfShifts);
});

router.post('/', async (req, res) => {
    const { name, hours } = req.body;
    await Shift.create({
        name: name,
        hours: hours,
    });
    res.json('SUCCESS');
})

module.exports = router;