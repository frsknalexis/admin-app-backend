const { response } = require('express');
const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const searchAll = async (req, res = response) => {

    const searchText = req.params.searchText;

    const regex = new RegExp(searchText, 'i');

    const [ users, medicos, hospitales ] = await Promise.all([
        User.find({ name: regex }),
        Medico.find({ name: regex })
            .populate('user', 'name image')
            .populate('hospital', 'name image'),
        Hospital.find({ name: regex })
            .populate('user', 'name image')
    ]);

    res.json({
        ok: true,
        users,
        medicos,
        hospitales
    });
};

const searchByType = async (req, res = response) => {

    const searchType = req.params.searchType;

    const searchText = req.params.searchText;

    const regex = new RegExp(searchText, 'i');

    let data = [];

    switch (searchType) {
        case 'users':
            data = await User.find({ name: regex });
            break;
        case 'medicos':
            data = await Medico.find({ name: regex })
                .populate('user', 'name image')
                .populate('hospital', 'name image');
            break;
        case 'hospitales':
            data = await Hospital.find({ name: regex })
                .populate('user', 'name image');
            break;
        default:
            return res.status(400)
                .json({
                    ok: false,
                    message: 'Indique un tipo de busqueda valido'
                });
    }

    res.json({
        ok: true,
        result: data
    });
};

module.exports = {
    searchAll,
    searchByType
}