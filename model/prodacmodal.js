import {Sequelize} from "sequelize";
import db from "../config/db_config.js";

const {DataTypes}= Sequelize;

const Prodact = db.define('product',{    
    name:DataTypes.STRING,
    Img:DataTypes.STRING,
    url:DataTypes.STRING,
    harga:DataTypes.INTEGER,
    jenis:DataTypes.STRING
},{
    freezeTableName:true
});

export default Prodact;
