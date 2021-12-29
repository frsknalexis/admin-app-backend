const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const path = require('path');
const fs = require('fs');

const uploadImage = (req, res = response) => {

    const type = req.params.type;

    const id = req.params.id;

    const validTypes = [ 'hospitales', 'medicos', 'users' ];

    if (!validTypes.includes(type)) {
        return res.status(400)
            .json({
                ok: false,
                message: 'El tipo debe tener un valor valido (users, medicos u hospitales)'
            });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false,
                message: 'No files were uploaded.'
            });
    }

    const image = req.files.image;

    const shortName = image.name.split('.');

    const imageExtension = shortName[shortName.length - 1];

    const validExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ];

    if (!validExtensions.includes(imageExtension)) {
        return res.status(400)
            .json({
                ok: false,
                message: 'No es una extension permitida'
            });
    }

    const imageName = `${ uuidv4() }.${ imageExtension }`;

    const path = `./uploads/${ type }/${ imageName }`;

    image.mv(path, (e) => {

        if (e) {
            console.log(e);
            return res.status(500)
                .json({
                    ok: false,
                    message: 'Error al mover la image'
                });
        }

        res.json({
            ok: true,
            message: 'Image uploaded',
            imageName
        });
    });

    updateImage(type, id, imageName);
};

const showImage = (req, res = response) => {

    const type = req.params.type;

    const image = req.params.image;

    const pathImage = path.join(__dirname, `../uploads/${ type }/${ image }`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        const pathImage = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImage);
    }
};

module.exports = {
    uploadImage,
    showImage
}