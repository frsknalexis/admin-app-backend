const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImage = (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

const updateImage = async (type, id, imageName) => {

    let oldPath = '';

    switch (type) {
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                return false;
            }

            oldPath = `./uploads/hospitales/${ hospital.image }`;

            deleteImage(oldPath);

            hospital.image = imageName;

            await hospital.save();

            return true;
        case 'medicos':
            const medico = await Medico.findById(id);

            if (!medico) {
                return false;
            }

            oldPath = `./uploads/medicos/${ medico.image }`;

            deleteImage(oldPath);

            medico.image = imageName;

            await medico.save();

            return true;
        case 'users':
            const user = await User.findById(id);

            if (!user) {
                return false;
            }

            oldPath = `./uploads/users/${ user.image }`;

            deleteImage(oldPath);

            user.image = imageName;

            await user.save();

            return true;
    }
};

module.exports = {
    updateImage
}