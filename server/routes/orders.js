const express = require('express');
const router = express.Router();
const { Orders } = require('../models');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const orders = await Orders.findAll({
        where: {
            UserId: userId
        }
    });
    res.json(orders);
});

router.post("/", async (req, res) => {
    const order = req.body;
    await Orders.create(order);
    res.json(order);
});

module.exports = router;