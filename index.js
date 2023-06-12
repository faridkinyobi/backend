import express  from 'express';
import cors from  'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path'
import db_confiq from   './config/db_config.js'
import UserRout from './app/api/users/router.js'
import ProdactRout from './app/api/product/router.js'
import PenilaanctRout from './app/api/penilaan/router.js'
import authentication from './app/middlewares/authentication.js';

db_confiq.sync().then(()=>console.log('data base ready'))

dotenv.config()

const app = express()

app.use(express.static('public'));

app.use(cookieParser());
app.use(cors())
app.use(express.json());

app.use(UserRout)

// middleware authentication
app.use(authentication)

app.use(ProdactRout)
app.use(PenilaanctRout)

const port = 5000
app.listen(port,()=>console.log(`running server on port ${port}`))