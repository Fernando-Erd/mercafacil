require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const loginApp = express.Router();
const bodyParser = require('body-parser');

loginApp.post('/', (req, res, next) => {
    if(req.body.user === 'Macapá' && req.body.password === '123'){
        const id = 1;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
    } else if(req.body.user === 'Varejão' && req.body.password === '123mudar'){
        const id = 2;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({message: 'Login inválido!'});
});

module.exports = loginApp
