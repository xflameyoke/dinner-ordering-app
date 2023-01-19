const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models');

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const menuRouter = require('./routes/menu');
app.use('/menu', menuRouter);
const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);
const shiftRouter = require('./routes/shift');
app.use('/shift', shiftRouter);