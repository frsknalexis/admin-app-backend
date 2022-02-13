const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJwt, validateAdminRole, validateAdminRoleOrSameUser} = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validateJwt, getUsers);

router.post('/', [ check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields ], createUser);

router.put('/:userId', [ validateJwt,
    validateAdminRoleOrSameUser,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    validateFields ], updateUser);

router.delete('/:userId', [ validateJwt,
    validateAdminRole ], deleteUser);

module.exports = router;