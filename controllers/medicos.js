const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('user', 'name image')
        .populate('hospital', 'name image');

    res.json({
        ok: true,
        medicos
    });
};

const createMedico = async (req, res = response) => {

    try {

        const userId = req.userId;

        const medico = new Medico({
            user: userId,
            ...req.body
        });

        const medicoSaved = await medico.save();

        res.json({
            ok: true,
            medico: medicoSaved
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

const updateMedico = (req, res = response) => {

    res.json({
        ok: true,
        message: 'updateMedico'
    });
};

const deleteMedico = (req, res = response) => {

    res.json({
        ok: true,
        message: 'deleteMedico'
    });
};

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}