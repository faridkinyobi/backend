const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {db}  = require('./db_config.js');
const UserRout = require('./app/api/users/router');
const ProdactRout = require('./app/api/product/router.js');
const PenilaanctRout = require('./app/api/penilaan/router');
const bodyParser = require('body-parser');
    try {
         db.authenticate()  
            db.sync().then(()=>console.log('data base ready'))
        } catch (error) {
            // console.log(error)
        }

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Mount routers at specific paths
app.use(UserRout.router);
app.use(ProdactRout.router);
app.use(PenilaanctRout.router);

const port = 5000;
app.listen(port, () => console.log(`running server on port ${port}`));
