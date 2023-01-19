const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    const listOfOrders = await Orders.findAll();
    res.json(listOfOrders);
})

router.get('/byId/:orderId', async (req, res) => {
    const oId = req.params.orderId;
    const order = await Orders.findByPk(oId);
    res.json(order);
});

router.post('/', validateToken, async (req, res) => {
    const order = req.body;
    await Orders.create(order);
    res.json(order);
});

module.exports = router;