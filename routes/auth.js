const { Router } = require('express');
const { login, googleSignIn, refreshToken } = require('../controllers/auth');
const { check } = require("express-validator");
const { validateFields } = require('../middlewares/validar-campos');
const { validateJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.post('', [ check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields ], login);

router.post('/google', [ check('token', 'Google Token is required').not().isEmpty(),
    validateFields ], googleSignIn);

router.get('/refresh', validateJwt, refreshToken);

module.exports = router;