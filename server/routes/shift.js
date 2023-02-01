const express = require('express');
const router = express.Router();
const { Shift } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const listOfShifts = await Shift.findAll();
    res.json(listOfShifts);
});

router.post('/', async (req, res) => {
    const { shiftName, hours } = req.body;
    await Shift.create({
        shiftName: shiftName,
        hours: hours,
    });
    res.json('SUCCESS');
});

router.get('/byId/:shiftId', async (req, res) => {
    const id = req.params.shiftId;
    const shift = await Shift.findByPk(id);
    res.json(shift);
});

router.put('/shiftName', validateToken, async (req, res) => {
    const { newShiftName, id } = req.body;
    await Shift.update({ shiftName: newShiftName }, {
        where: {
            id: id
        }
    });
    res.json(newShiftName);
});

router.put('/hours', validateToken, async (req, res) => {
    const { newHours, id } = req.body;
    await Menu.update({ hours: newHours }, {
        where: {
            id: id
        }
    });
    res.json(newHours);
})

router.delete('/:shiftId', validateToken, async (req, res) => {
    const shiftId = req.params.shiftId;
    await Shift.destroy({
        where: {
            id: shiftId,
        },
    });

    res.json('Zmiana usunięta');
});

module.exports = router;