const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const user = require('./controller/user.controller');

app.use('/', bodyParser.json());

app.use('/user', user);

app.use((error, req, res, _next)=>{
    res.send(error.message);
})
module.exports = app

