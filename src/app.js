const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

// Importdado Database
const connection = require('./database/db');

const app = express();

// Conectando banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Banco de dados conectado!')
        app.emit('Pronto')
    })
    .catch(err => {
        console.log(err)
    })

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Permitindo rotas
app.use(routes)

module.exports = app;