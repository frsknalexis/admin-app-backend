const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, createMedico, updateMedico, deleteMedico, getMedicoById } = require('../controllers/medicos');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validateJwt, getMedicos);

router.post('/', [ validateJwt,
    check('name', 'Medico name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').isMongoId(),
    validateFields ], createMedico);

router.put('/:medicoId', [ validateJwt,
    check('name', 'Medico name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').isMongoId(),
    validateFields ], updateMedico);

router.delete('/:medicoId', validateJwt, deleteMedico);

router.get('/:medicoId', validateJwt, getMedicoById);

module.exports = router;