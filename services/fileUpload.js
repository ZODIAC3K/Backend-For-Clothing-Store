const multer = require("multer");

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        VBArray(null, file.filename+'-'+Date.now());
    }
})

const upload = multer({ storage: storage });

module.exports = upload;