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
        throw new Error('Error connecting to DB');
    }
}

module.exports = {
    dbConnection
}