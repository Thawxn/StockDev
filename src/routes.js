const { Router } = require('express')

const routes = new Router()

// Importando controllers
const locationController = require('./controllers/locationController');
const typeProductController = require('./controllers/typeProductController');
const productController = require('./controllers/productController');

// CRUD localização
routes.get('/location', locationController.index);                              // visualizar localização
routes.get('/location/:name', locationController.indexId)                       // procurando pelo name
routes.post('/location/register', locationController.register);                 // reigistrar localização
routes.put('/location/edit/:id', locationController.edit);                      // editando informações de localização
routes.delete('/location/delete/:id', locationController.delete)                // deletar localização

// CRUD tipo de produto
routes.get('/productType', typeProductController.index);                        // visualizar tipo de produto
routes.get('/productType/:name', typeProductController.indexId)                 // procurando pelo name
routes.post('/productType/register', typeProductController.register);           // reigistrar tipo de produto
routes.put('/productType/edit/:id', typeProductController.edit);                // editando informações do tipo de produto
routes.delete('/productType/delete/:id', typeProductController.delete)          // deletar tipo de produto

// CRUD produto
routes.get('/product', productController.index);                                // visualizar produtos
routes.get('/product/:_id', productController.indexId);                         // visualizar produtos pelo id
routes.post('/product/register', productController.register);                   // registrar produto
routes.put('/product/edit/:id', productController.edit);                        // editando informações do produto
routes.delete('/product/delete/:id', productController.delete);                 // deletar produto

module.exports = routes