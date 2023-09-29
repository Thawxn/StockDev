const { Router } = require('express')

const routes = new Router()

// Importando controllers
const locationController = require('./controllers/locationController');
const typeProductController = require('./controllers/typeProductController');

// CRUD localização
routes.get('/location', locationController.index);                              // visualizar localização
routes.get('/location/:name', locationController.indexId)                       // procurando pelo name
routes.post('/location/register', locationController.register);                 // reigistrar localização
routes.put('/location/edit/:id', locationController.edit);                      // editar localização
routes.delete('/location/delete/:id', locationController.delete)                // deletar localização

// CRUD tipo de produto
routes.get('/productType', typeProductController.index);                        // visualizar localização
routes.get('/productType/:name', typeProductController.indexId)                 // procurando pelo name
routes.post('/productType/register', typeProductController.register);           // reigistrar localização
routes.put('/productType/edit/:id', typeProductController.edit);                // editar localização
routes.delete('/productType/delete/:id', typeProductController.delete)          // deletar localização

module.exports = routes