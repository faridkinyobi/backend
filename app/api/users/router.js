const express = require('express');
const  {authentication} =require('../../middlewares/authentication')

const {
    getUser,
    register,
    loginAuth,
    updateUser,
    deleteUser,
    logoutHandler,
    tokenHandler,
} = require('./controllers.js');



const router = express.Router();

router.get('/user',authentication,getUser);
router.post('/register',register);
router.post('/login',loginAuth);
router.post('/token',tokenHandler);
router.delete('/logout',authentication,logoutHandler);

router.patch('/user', authentication, updateUser);
router.delete('/user/:id', authentication,deleteUser);

module.exports={
    router
}