const express = require('express');
const router = express.Router();
const { Menu } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const listOfMenu = await Menu.findAll();
    res.json(listOfMenu);
});

router.post('/', async (req, res) => {
    const { name, price } = req.body;
    await Menu.create({
        name: name,
        price: price,
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

router.put('/price', validateToken, async (req, res) => {
    const { newPrice, id } = req.body;
    await Menu.update({ price: newPrice }, {
        where: {
            id: id
        }
    });
    res.json(newPrice);
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