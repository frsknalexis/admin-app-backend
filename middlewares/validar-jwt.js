const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401)
            .json({
                ok: false,
                message: 'No hay token en la peticion'
            });
    }

    try {

        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();

    } catch (e) {
        return res.status(401)
            .json({
                ok: false,
                message: 'Invalid token'
            });
    }
}

module.exports = {
    validateJwt
}