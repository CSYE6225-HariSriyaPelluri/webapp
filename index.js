const express = require('express');
const app = express();
const dotenv= require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const checkMethodType = require('./middleware/checkMethod');
const checkBody = require('./middleware/checkBody');
dotenv.config()


app.use(bodyParser.json());

app.use((req, res, next) => {

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    next();
});

app.all('/healthz',[checkMethodType, checkBody]);
app.use('/', routes)


module.exports=app