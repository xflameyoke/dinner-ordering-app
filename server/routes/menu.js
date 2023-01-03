const express = require('express');
const router = express.Router();
const { Menu } = require('../models');
const { validateToken } = require("../middlewares/authMiddleware");

router.get('/', async (req, res) => {
    const listOfMenu = await Menu.findAll();
    res.json(listOfMenu);
});

router.post("/", validateToken, async (req, res) => {
    const menu = req.body;
    await Menu.create(menu);
    res.json(menu);
})

module.exports = router;