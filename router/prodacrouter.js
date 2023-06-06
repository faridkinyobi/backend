import express  from "express";

import {
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
} from "../controller/prodaccontroler.js";


const router = express.Router();

router.get('/products', getProduct )
router.get('/products/:id',getProductById)
router.patch('/products/:id',updateProduct)
router.post('/products', createProduct)
router.delete('/products/:id',deleteProduct)

export default router