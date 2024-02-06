const dotenv= require('dotenv');
dotenv.config();
//Reference used: https://sequelize.org/docs/v6/getting-started/
module.exports = {
    HOST: 'localhost',
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    DIALECT: 'mysql'
}