import {Sequelize} from 'sequelize'
import db from '../../../config/db_config.js'
const {DataTypes} = Sequelize

const User = db.define('users',{
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
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,  // nilai tidak boleh nul 
            isEmail: true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true  // nilai tidak boleh nul 
        }
    }    
},{
    freezeTableName:true
});

export default User;
