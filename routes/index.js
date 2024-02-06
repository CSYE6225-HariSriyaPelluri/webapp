const express = require('express');
const router = express.Router();
const sequelize = require('../models/index')

router.get('/healthz',(req, res) => {
      try{
      sequelize.authenticate().then(() => {
        console.log('Database connected.')
        return res.status(200).json().send();
      })
      .catch((err)=> {
        return res.status(503).json().send();
      })
    } catch(err){
      console.log(err);
    }
});

module.exports = router;