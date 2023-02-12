const express = require('express');
const router = express.Router();
const { Menu } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const listOfMenu = await Menu.findAll();
    res.json(listOfMenu);
});

router.post('/', async (req, res) => {
    const { name, desc } = req.body;
    await Menu.create({
        name: name,
        desc: desc,
    });
    res.json('SUCCESS');
});

router.get('/byId/:menuId', async (req, res) => {
    const id = req.params.menuId;
    const menu = await Menu.findByPk(id);
    res.json(menu);
});

router.put('/name', validateToken, async (req, res) => {
    const { newName, id } = req.body;
    await Menu.update({ name: newName }, {
        where: {
            id: id
        }
    });
    res.json(newName);
})

router.put('/desc', validateToken, async (req, res) => {
    const { newDesc, id } = req.body;
    await Menu.update({ desc: newDesc }, {
        where: {
            id: id
        }
    });
    res.json(newDesc);
})


router.delete('/:menuId', validateToken, async (req, res) => {
    const menuId = req.params.menuId;
    await Menu.destroy({
        where: {
            id: menuId,
        },
    });

    res.json('Użytkownik usunięty');
});

module.exports = router;