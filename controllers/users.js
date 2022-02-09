const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJwt } = require("../helpers/jwt");

const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const to = Number(req.query.to) || 5;

    const [ users, total ] = await Promise.all([
        User.find({}, 'name email password role google image')
            .skip(from)
            .limit(to),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
    });
};

const createUser = async (req, res = response) => {

    const { password, email } = req.body;

    try {

        const existsEmail = await User.findOne({ email });

        if (existsEmail) {
            return res.status(400)
                .json({
                    ok: false,
                    message: 'Email already exists'
                });
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJwt(user._id);

        res.json({
            ok: true,
            user,
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

const updateUser = async (req, res = response) => {
    try {
        const userId = req.params.userId;

        const existsUser = await User.findById(userId);

        if (!existsUser) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'User does not exists by userId'
                });
        }

        const { password, google, email, ...fields } = req.body;

        if (existsUser.email !== email) {
            const existsUserByEmail = await User.findOne({ email });

            if (existsUserByEmail) {
                return res.status(400)
                    .json({
                        ok: false,
                        message: 'Email already exists'
                    });
            }
        }

        if (!existsUser.google) {
            fields.email = email;
        } else if (existsUser.email !== email) {
            return res.status(400)
                .json({
                    ok: false,
                    message: 'Usuarios de Google no pueden cambiar su correo'
                });
        }

        const userUpdated = await User.findByIdAndUpdate(userId, fields, { new: true });

        res.json({
            ok: true,
            user: userUpdated
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

const deleteUser = async (req, res = response) => {

    try {

        const userId = req.params.userId;

        const existsUser = await User.findById(userId);

        if (!existsUser) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'User does not exists by userId'
                });
        }

        await User.findByIdAndDelete(userId);

        res.json({
            ok: true,
            message: 'User has been deleted'
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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}