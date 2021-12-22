const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJwt } = require("../helpers/jwt");

const login = async (req, res = response) => {

    try {

        const { email, password  } = req.body;

        const existsUser = await User.findOne({ email });

        if (!existsUser) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'User does not exists by email'
                });
        }

        const validPassword = bcrypt.compareSync(password, existsUser.password);

        if (!validPassword) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Password invalid'
                });
        }

        const token = await generateJwt(existsUser._id);

        res.json({
            ok: true,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500)
            .json({
                ok: false,
                message: 'An error occurred...'
            });
    }
};

module.exports = {
    login
};