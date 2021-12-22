const jwt = require('jsonwebtoken');

const generateJwt = (userId) => {

    return new Promise((resolve, reject) => {

        const payload = {
            userId
        };

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        },(e, token) => {
            if (e) {
                console.log(e);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJwt
}