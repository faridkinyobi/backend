const {DataTypes} = require('sequelize')
const {db} = require("../../../../db_config.js")

const UserModal = db.define('users',{
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
    },
    refreshToken: {
        type:DataTypes.TEXT
    }
},{
    freezeTableName:true
});

module.exports={
    UserModal
}
// (async()=>{
//     await db.sync();
// })