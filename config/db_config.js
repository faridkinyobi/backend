import {Sequelize} from"sequelize";

const db = new Sequelize('angkringan_db','root', '', {
    host:"localhost",
    dialect:"mysql"
});

export default db