const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require('../models');
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
    bcrypt => {
        Users.create({
            username: username,
            userType: userType,
            userToken: userToken,
            userPIN: userPIN,
        });
    }
    res.json("SUCESS");
});

router.post('/login', async (req, res) => {
    const { userToken, userPIN } = req.body;

    const user = await Users.findOne({ where: { userToken: userToken } });

    if (!user) res.json({ error: "Użytkownik nie istnieje" });

    bcrypt.compare(userPIN, user.userPIN).then((match) => {
        if (!match) res.json({ error: "Błędny użytkownik lub PIN!" });

        const accessToken = sign(
            { username: user.username, id: user.id, userType: user.userType }, "logininformation");
        res.json({token: accessToken, username: user.username, id: user.id, userType: user.userType});
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

router.put("/username", validateToken, async (req, res) => {
    const { newUsername, id } = req.body;
    await Users.update({ username: newUsername }, {
        where: {
            id: id
        }
    });
    res.json(newUsername);
});

router.put("/userToken", validateToken, async (req, res) => {
    const { newUserToken, id } = req.body;
    await Users.update({ userToken: newUserToken }, {
        where: {
        id: id
    }});
    res.json(newUserToken);
})

router.put("/userPIN", validateToken, async (req, res) => {
    const { newUserPIN, id } = req.body;
    await Users.update({ userPIN: newUserPIN }, {
        where: {
        id: id
    }});
    res.json(newUserPIN);
})

router.delete('/:userId', validateToken, async (req, res) => {
    const userId = req.params.userId;
    await Users.destroy({
        where: {
            id: userId,
        },
    });

    res.json('Użytkownik usunięty');
});

module.exports = router;