const { Router } = require('express');
const { login } = require('../controllers/auth');
const {check} = require("express-validator");
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();

router.post('', [ check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields ], login);

module.exports = router;