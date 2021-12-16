require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());

dbConnection();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});