import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter(req, file, cb) {

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf"
        ];

        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Invalid file type."));
        }

        cb(null, true);

    }

});

export default upload;