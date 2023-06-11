import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // import asas frim "../../public/image"
    cb(null, 'public/foto');
    },
    filename: function (req, file, cb) {
      cb(null, Math.floor(Math.random() * 99999999)+'-'+ file.originalname);
    },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(
                {
                message: 'Unsupported file format',
            },
            false
        );
        }
    };
    // Inisialisasi multer dengan konfigurasi penyimpanan dan limits
const uploadMiddleware = multer({
    storage,
    limits: {
      fileSize: 2 * 290 * 290, // Batasan ukuran file dalam byte (misalnya, 5MB)
    },
    fileFilter:fileFilter
  });

export default uploadMiddleware