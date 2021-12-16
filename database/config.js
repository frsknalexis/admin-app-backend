const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

        console.log('DB Online');

    } catch (e) {
        console.log(e);
        throw new Error('Error al conectarse a la DB');
    }
}

module.exports = {
    dbConnection
}