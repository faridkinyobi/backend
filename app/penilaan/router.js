import express  from "express";

import {
    getPenilaan,
    getPenilaanById,
    deletePenilaan,
    updatePenilaan,
    createPenilaan
} from "./controller.js";


const router = express.Router();

router.get('/penilaan', getPenilaan);
router.get('/penilaan/:id',getPenilaanById);
router.patch('/penilaan/:id',updatePenilaan)
router.post('/penilaan', createPenilaan)
router.delete('/penilaan/:id',deletePenilaan)

export default router ;