import express from 'express'
import authentication from '../../middlewares/authentication.js'
import {
    getUser,
    getUserById,
    createUser,
    register,
    loginAuth,
    updateUser,
    deleteUser,
    tokenHandler,
    logoutHandler
} from "./controllers.js";


const router = express.Router();

// belum dipakai
router.get('/user', getUser);
router.get('/user/:id',getUserById);
router.post('/users', createUser);
// belum dipakai

router.post('/register', register);
router.post('/login', loginAuth);
router.get('/token', tokenHandler);
router.delete('/logout', logoutHandler);

router.patch('/user', authentication, updateUser);
router.delete('/user', authentication, deleteUser);

export default router;