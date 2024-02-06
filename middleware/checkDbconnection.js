const sequelize = require('../models/index')

function checkDbconnection(req,res,next){
    sequelize.authenticate().then(() => {
        console.log('Database connected.')
        return res.status(200).json().send();
      })
      .catch((err)=> {
        return res.status(503).json().send();
      })
}

module.exports=checkDbconnection