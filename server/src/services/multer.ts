import multer from "multer";

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (_, file, callback) => {
        if (ALLOWED_FORMATS.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Not supported file format"));
        }
    }
});

export default upload;