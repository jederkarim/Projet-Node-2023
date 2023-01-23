const multer = require('multer')
const path = require('path');
const { v4: uuid } = require('uuid');

var myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFileName = uuid() + path.extname(file.originalname);
        cb(null, newFileName);

    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.png', '.jpeg', '.jpg', '.gif'] //type de fichier autoriser pour uploader
    const extension = path.extname(file.originalname);
    cb(null, allowedFileExtensions.includes(extension));
}

const upload = multer({
    storage: myStorage,
    fileFilter: fileFilter,

});
module.exports = upload;
