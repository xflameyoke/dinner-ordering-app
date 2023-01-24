const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.get('/byId/:userId', async (req, res) => {
    const id = req.params.userId;
    const user = await Users.findByPk(id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const { username, userType, userToken, userPIN } = req.body;
    bcrypt.hash(userPIN, 4).then((hash) => {
        Users.create({
            username,
            userType,
            userToken,
            userPIN: hash,
           })
       })
    res.json('SUCESS');
});

router.post('/login', async (req, res) => {
    const { userToken, userPIN } = req.body;

    const user = await Users.findOne({ where: { userToken: userToken } });

    if (!user) res.json({ error: 'Użytkownik nie istnieje' });

    bcrypt.compare(userPIN, user.userPIN).then((match) => {
        if (!match) res.json({ error: 'Błędny użytkownik lub PIN!' });

        const accessToken = sign(
            { username: user.username, id: user.id, userType: user.userType, userToken: user.userToken }, 'logininformation');
        res.json({ token: accessToken, username: user.username, id: user.id, userType: user.userType, userToken: user.userToken });
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

router.put('/username', validateToken, async (req, res) => {
    const { newUsername, id } = req.body;
    await Users.update({ username: newUsername }, {
        where: {
            id: id
        }
    });
    res.json(newUsername);
});

router.put('/userToken', validateToken, async (req, res) => {
    const { newUserToken, id } = req.body;
    await Users.update({ userToken: newUserToken }, {
        where: {
        id: id
    }});
    res.json(newUserToken);
})

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    await Users.destroy({
        where: {
            id: userId,
        },
    });

    res.json('Użytkownik usunięty');
});

router.put("/changePIN", validateToken, async (req, res) => {
  const { oldPIN, newPIN } = req.body;
  const user = await Users.findOne({ where: { userToken: req.user.userToken } });

  bcrypt.compare(oldPIN, user.userPIN).then(async (match) => {
    if (!match) res.json({ error: "Wprowadzono błędny kod PIN!" });

    bcrypt.hash(newPIN, 4).then((hash) => {
      Users.update(
        { userPIN: hash },
        { where: { userToken: req.user.userToken } }
      );
      res.json("SUCCESS");
    });
  });
});

module.exports = router;