import express  from "express";
import upload from "../../middlewares/multer.js"
import {
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
} from "./controler.js";


const router = express.Router();

// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/foto')
//     },
//     filename: function (req, file, cb) {
//         const ext = file.originalname.split('.').pop();
//         cb(null, `${file.fieldname}-${Date.now()}.${ext}`); // Nama file dengan timestamp
//     },
//     });

// const upload= multer({storage:storage});

router.get('/products', getProduct )
router.get('/products/:id',getProductById)
router.patch('/products/:id',updateProduct)
router.post('/products',upload.single('foto'), createProduct)
router.delete('/products/:id',deleteProduct)

export default router