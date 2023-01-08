const express = require('express');
const router = express.Router();
const { Shift } = require('../models');

router.get('/', async (req, res) => {
    const listOfShifts = await Menu.findAll();
    res.json(listOfShifts);
});

router.post("/", async (req, res) => {
    const shift = req.body;
    await Shift.create(shift);
    res.json(shift);
})

module.exports = router;