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
        res.status(500)
            .json({
                ok: false,
                message: 'An error occurred...'
            });
    }
};

const updateHospital = async (req, res = response) => {

    try {

        const hospitalId = req.params.hospitalId;

        const userId = req.userId;

        const existsHospital = await Hospital.findById(hospitalId);

        if (!existsHospital) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Hospital does not exists by hospitalId'
                });
        }

        const hospitalChanged = {
            ...req.body,
            user: userId
        };

        const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, hospitalChanged, { new : true });

        res.json({
            ok: true,
            hospital: hospitalUpdated
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

const deleteHospital = async (req, res = response) => {

    try {

        const hospitalId = req.params.hospitalId;

        const existsHospital = await Hospital.findById(hospitalId);

        if (!existsHospital) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Hospital does not exists by hospitalId'
                });
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            message: 'Hospital has been deleted'
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
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}