const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {

    try {

        const googleToken = req.body.token;

        const { name, email, picture } = await googleVerify(googleToken);

        const existsUser = await User.findOne({ email });

        let user;

        if (!existsUser) {
            user = new User({
                name,
                email,
                password: 'default-password',
                image: picture,
                google: true
            });
        } else {
            user = existsUser;
            user.google = true;
        }

        await user.save();

        const token = await generateJwt(user._id);

        res.json({
            ok: true,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(401)
            .json({
                ok: false,
                message: 'Invalid token'
            });
    }
};

const refreshToken = async (req, res = response) => {

    const userId = req.userId;

    const token = await generateJwt(userId);

    const user = await User.findById(userId);

    res.json({
        ok: true,
        token,
        user
    });
};

module.exports = {
    login,
    googleSignIn,
    refreshToken
};