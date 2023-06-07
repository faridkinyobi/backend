import express from 'express'
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    register,
    loginAuth
} from "./controler.js";
const router = express.Router();

router.get('/user', getUser);
router.get('/user/:id',getUserById);
router.patch('/user/:id',updateUser);
router.post('/users', createUser);
router.delete('/user/:id',deleteUser);

router.post('/register', register);
router.post('/login', loginAuth);

export default router;