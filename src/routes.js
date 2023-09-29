const { Router } = require('express')

const routes = new Router()

// Importando controllers
const locationController = require('./controllers/locationController');

// CRUD localização
routes.get('/location', locationController.index);          // visualizar localização
routes.get('/location/:name', locationController.indexId)   // procurando pelo name
routes.post('/register', locationController.register);      // reigistrar localização
routes.put('/edit/:id', locationController.edit);           // editar localização
routes.delete('/delete/:id', locationController.delete)     // deletar localização

module.exports = routes