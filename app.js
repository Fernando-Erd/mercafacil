const express = require('express')
const app  = express();
const loginApp = require('./routes/login')
const clientesApp = require('./routes/addClient')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use('/login',loginApp);
app.use('/add_client',clientesApp);

app.listen(8000, function () {
    console.log('Init application in localhost:80')
})
