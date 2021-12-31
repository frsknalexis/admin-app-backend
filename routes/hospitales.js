const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validateJwt, getHospitales);

router.post('/', [ validateJwt,
    check('name', 'Hospital name is required').not().isEmpty(),
    validateFields ], createHospital);

router.put('/:hospitalId', [ validateJwt,
    check('name', 'Hospital name is required').not().isEmpty(),
    validateFields ], updateHospital);

router.delete('/:hospitalId', validateJwt, deleteHospital);

module.exports = router;