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

router.put('/gId', validateToken, async (req, res) => {
    const { newGroupId, id } = req.body;
    await Group.update({ groupId: newGroupId }, {
        where: {
            id: id
        }
    });
    res.json(newGroupId);
});

router.put('/gDesc', validateToken, async (req, res) => {
    const { newGroupDesc, id } = req.body;
    await Group.update({ groupDesc: newGroupDesc }, {
        where: {
            id: id
        }
    });
    res.json(newGroupDesc);
});

router.delete('/:groupId', validateToken, async (req, res) => {
    const groupId = req.params.groupId;
    await Group.destroy({
        where: {
            id: groupId,
        },
    });

    res.json("Grupa usunięta!");
})

module.exports = router;