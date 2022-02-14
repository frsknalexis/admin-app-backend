require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use(express.static('public'));

app.use('/admin-app/v1/users', require('./routes/users'));
app.use('/admin-app/v1/login', require('./routes/auth'));
app.use('/admin-app/v1/hospitales', require('./routes/hospitales'));
app.use('/admin-app/v1/medicos', require('./routes/medicos'));
app.use('/admin-app/v1/search', require('./routes/searchs'));
app.use('/admin-app/v1/upload', require('./routes/uploads'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Server run on port: ' + process.env.PORT);
});