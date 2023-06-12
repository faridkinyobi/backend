import {Sequelize} from "sequelize";
import db from "../../../config/db_config.js"

const {DataTypes}= Sequelize;

const Saran = db.define('Saran',{
    id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },    
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [2,100]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            isEmail: true
        }
    },
    alamat:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [2,100]
        }
    },
    pesan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [2,100]
        }
    }
    
},{
    freezeTableName:true
});

export default Saran;
(async()=>{
    await db.sync();
})