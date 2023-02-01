const express = require('express');
const router = express.Router();
const { Group } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const listOfGroup = await Group.findAll();
    res.json(listOfGroup);
});

router.post('/', validateToken, async (req, res) => {
    const { groupId, groupDesc } = req.body;
    await Group.create({
        groupId: groupId,
        groupDesc: groupDesc,
    });
    res.json('SUCCESS');
});

router.get('/byId/:groupId', async (req, res) => {
    const id = req.params.groupId;
    const group = await Group.findByPk(id);
    res.json(group);
});

module.exports = router;