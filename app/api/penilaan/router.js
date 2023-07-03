import express  from "express";

import {
    getSaran,
    getSaranById,
    deleteSaran,
    updateSaran,
    createSaran
} from "./controller.js";


const router = express.Router();

router.get('/saran', getSaran);
router.get('/saran/:id',getSaranById);
router.patch('/saran/:id',updateSaran)
router.post('/saran', createSaran)
router.delete('/saran/:name',deleteSaran)

export default router ;