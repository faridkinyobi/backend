const express = require('express');
const {uploadMiddleware} =require("../../middlewares/multer")
const  {authentication} =require('../../middlewares/authentication')


const {
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
} =require( "./controler")


const router = express.Router();

router.get('/products',authentication, getProduct )
router.get('/product',getProduct )
router.get('/products/:id',getProductById)
router.patch('/products/:id',uploadMiddleware,authentication,updateProduct)
router.post('/products',uploadMiddleware,authentication,createProduct)
router.delete('/products/:id',authentication,deleteProduct)

module.exports={router}