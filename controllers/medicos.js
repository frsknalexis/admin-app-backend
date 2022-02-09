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

const getMedicoById = async (req, res = response) => {

    try {

        const medicoId = req.params.medicoId;

        const medico = await Medico.findById(medicoId)
            .populate('user', 'name image')
            .populate('hospital', 'name image');

        if (!medico) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Medico does not exists by medicoId'
                });
        }

        res.json({
            ok: true,
            medico
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

const updateMedico = async (req, res = response) => {

    try {

        const medicoId = req.params.medicoId;

        const userId = req.userId;

        const existsMedico = await Medico.findById(medicoId);

        if (!existsMedico) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Medico does not exists by medicoId'
                });
        }

        const medicoChanged = {
            ...req.body,
            user: userId
        };

        const medicoUpdated = await Medico.findByIdAndUpdate(medicoId, medicoChanged, { new : true });

        res.json({
            ok: true,
            medico: medicoUpdated
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

const deleteMedico = async (req, res = response) => {

    try {

        const medicoId = req.params.medicoId;

        const existsMedico = await Medico.findById(medicoId);

        if (!existsMedico) {
            return res.status(404)
                .json({
                    ok: false,
                    message: 'Medico does not exists by medicoId'
                });
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            message: 'Medico has been deleted'
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
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
}