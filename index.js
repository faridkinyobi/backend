import express from "express";
import fileUpload from "express-fileupload";
import cors from  'cors'
import dotenv from 'dotenv';
import db_confiq from   './config/db_config.js'
import UserRout from './app/users/roter.js'
import ProdactRout from './router/prodacrouter.js'
import PenilaanctRout from './app/penilaan/router.js'

db_confiq.sync().then(()=>console.log('data base ready'))

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());
app.use(fileUpload)
app.use(UserRout)
app.use(ProdactRout)
app.use(PenilaanctRout)
app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
  });
app.get('/api', (req, res) => {
    console.log('ok')
    res.send('ok');
  });
const port =5000
app.listen(port,()=>console.log(`running server on port ${port}`))