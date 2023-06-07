import {Sequelize} from "sequelize";
import db from "../../../config/db_config.js";

const {DataTypes}= Sequelize;

const Prodact = db.define('Prodact',{  
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [2,100]
        }
    },
    foto:{
        type:DataTypes.STRING,
        url:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul
        }
    },
    harga:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul
        }
    },
    jenis:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul
            len: [2,100]
        }
    },
},{
    freezeTableName:true
});
export default Prodact;
(async()=>{
    await db.sync();
})