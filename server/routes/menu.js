const express = require('express');
const router = express.Router();
const { Menu } = require('../models');

router.get('/', async (req, res) => {
    const listOfMenu = await Menu.findAll();
    res.json(listOfMenu);
});

router.post("/", async (req, res) => {
    const menu = req.body;
    await Menu.create(menu);
    res.json(menu);
})

module.exports = router;