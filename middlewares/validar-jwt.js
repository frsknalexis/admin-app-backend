const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
        req.userId = userId;
        next();

    } catch (e) {
        return res.status(401)
            .json({
                ok: false,
                message: 'Invalid token'
            });
    }
}

const validateAdminRole = async (req, res = response, next) => {

    try {

        const userId = req.userId;

        const existsUser = await User.findById(userId);

        if (!existsUser) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'User does not exists by userId'
                });
        }

        if (existsUser.role !== 'ADMIN_ROLE') {
            return res.status(403)
                .json({
                    ok: false,
                    message: 'No tiene permisos para realizar dicha accion'
                });
        }

        next();

    } catch (e) {
        console.log(e);
        res.status(500)
            .json({
                ok: false,
                message: 'An error occurred...'
            });
    }
}

const validateAdminRoleOrSameUser = async (req, res = response, next) => {

    try {

        const userId = req.userId;

        const userIdPath = req.params.userId;

        const existsUser = await User.findById(userId);

        if (!existsUser) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'User does not exists by userId'
                });
        }

        if (existsUser.role === 'ADMIN_ROLE' || userId === userIdPath) {
            next();
        } else {
            return res.status(403)
                .json({
                    ok: false,
                    message: 'No tiene permisos para realizar dicha accion'
                });
        }

    } catch (e) {
        console.log(e);
        res.status(500)
            .json({
                ok: false,
                message: 'An error occurred...'
            });
    }
}

module.exports = {
    validateJwt,
    validateAdminRole,
    validateAdminRoleOrSameUser
}