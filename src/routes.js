const { Router } = require('express')

const routes = new Router()

// Importando controllers
const homeController = require('./controllers/homeController');

// Rotas inicio
routes.get('/', homeController.index)

module.exports = routes