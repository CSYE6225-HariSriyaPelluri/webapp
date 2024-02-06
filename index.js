const express = require('express');
const app = express();
const dotenv= require('dotenv');
const bodyParser = require('body-parser');
const routePaths = require('./routes/index');

app.use(bodyParser.json());

app.use((req, res, next) => {
    
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    next();
});

routePaths(app)


module.exports=app