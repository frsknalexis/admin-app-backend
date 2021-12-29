const { Router } = require('express');
const { validateJwt } = require('../middlewares/validar-jwt');
const { searchAll, searchByType } = require("../controllers/searchs");

const router = Router();

router.get('/:searchText', validateJwt, searchAll);

router.get('/:searchType/:searchText', validateJwt, searchByType);

module.exports = router;