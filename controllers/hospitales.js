const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('user', 'name image');

    res.json({
        ok: true,
        hospitales
    });
};

const createHospital = async (req, res = response) => {

    try {

        const userId = req.userId;

        const hospital = new Hospital({
            user: userId,
            ...req.body
        });

        const hospitalSaved = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalSaved
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: true,
            message: 'An error occurred...'
        });
    }
};

const updateHospital = (req, res = response) => {

    res.json({
        ok: true,
        message: 'updateHospital'
    });
};

const deleteHospital = (req, res = response) => {

    res.json({
        ok: true,
        message: 'deleteHospital'
    });
};

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}