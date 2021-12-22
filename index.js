require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/admin-app/v1/users', require('./routes/users'));
app.use('/admin-app/v1/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Server run on port: ' + process.env.PORT);
});