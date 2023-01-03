const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/authMiddleware");

router.get('/', async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.get('/byId/:userId', async (req, res) => {
    const id = req.params.userId;
    const user = await Users.findByPk(id);
    res.json(user);
});

router.post("/", validateToken, async (req, res) => {
    const { username, userType, userToken, userPIN } = req.body;
    bcrypt.hash(userPIN, 4).then((hash) => {
        Users.create({
            username: username,
            userType: userType,
            userToken: userToken,
            userPIN: hash
        });
        res.json("SUCESS");
    });
});

router.post('/login', async (req, res) => {
    const { userToken, userPIN } = req.body;

    const user = await Users.findOne({ where: { userToken: userToken } });

    if (!user) res.json({ error: "Użytkownik nie istnieje" });

    bcrypt.compare(userPIN, user.userPIN).then((match) => {
        if (!match) res.json({ error: "Błędny użytkownik lub PIN!" });

        const accessToken = sign(
            { username: user.username, id: user.id, userType: user.userType }, "logininformation");
        res.json(accessToken);
    });
});

module.exports = router;