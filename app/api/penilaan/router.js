const express = require('express');
const {verifyToken} = require("../../middlewares/verifytoken.js")
const{
    getSaran,
    getSaran2,
    getSaranById,
    deleteSaran,
    updateSaran,
    createSaran
} = require("./controller")


const router = express.Router();

router.get('/saran',verifyToken, getSaran);
router.get('/saranHome', getSaran2);
router.get('/saran/:id',verifyToken,getSaranById);
router.post('/saran/:id',updateSaran)
router.post('/saran',createSaran)
router.delete('/saran/:id',verifyToken,deleteSaran)

module.exports={
    router 
} 