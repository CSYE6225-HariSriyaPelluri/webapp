const dotenv= require('dotenv');
dotenv.config();
//Reference used: https://sequelize.org/docs/v6/getting-started/
module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    DIALECT: 'mysql'
}