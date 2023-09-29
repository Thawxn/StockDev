const express = require('express');
const path = require('path')
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
        app.emit('OK')
    })
    .catch(err => {
        console.log(err)
    })

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Models
const Stock = require('./models/StockModel');
const Product = require('./models/ProductModel');
const Location = require('./models/LocationModel');
const TypeProduct = require('./models/TypeProductModel');

// static
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// view enginer
app.set('views', (path.resolve(__dirname, 'views')))
app.set('view engine', 'ejs')

// Permitindo rotas
app.use(routes)

module.exports = app;