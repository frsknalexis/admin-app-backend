const { Router } = require('express');
const { validateJwt } = require("../middlewares/validar-jwt");
const { uploadImage, showImage} = require("../controllers/uploads");
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:type/:id', validateJwt, uploadImage);

router.get('/:type/:image', validateJwt, showImage);

module.exports = router;