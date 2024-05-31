
const Sequelize  = require('sequelize');

const db = new Sequelize(
    'angkringan_db',
    'root', 
    '', {
    host:"localhost",
    dialect:"mysql"
});

// const db = new Sequelize(
//     'pojokbam_angkringan',
//     'pojokbam_pjbm', 
//     'Zhd^,rDv^Z2O', {
//     host:"pjapi1.pojokbambu.com",
//     dialect:"mysql"
// });

// console.log(db)
module.exports={
        db
    }