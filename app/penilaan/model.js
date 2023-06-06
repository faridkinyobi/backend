import {Sequelize} from "sequelize";
import db from "../../config/db_config.js"

const {DataTypes}= Sequelize;

const Pesan = db.define('Penilaan',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUDV4,
        allowNull:false,
        validate:{
            notEmpty:true  // nilai tidak boleh nul dan mty sring
        }
    },    
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [4,100]
        }
    },
    img:{
        type: DataTypes.STRING
    },
    url:{
        type: DataTypes.STRING
    },
    pesan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            len: [4,100]
        }
    }
    
},{
    freezeTableName:true
});

export default Pesan;
