const { Router } = require('express')

const routes = new Router()

// Importando controllers
const locationController = require('./controllers/locationController');
const typeProductController = require('./controllers/typeProductController');
const productController = require('./controllers/productController');
const stockController = require('./controllers/stockController');

// CRUD produto
routes.get('/product', productController.index);                                // rota GET de todos os produtos
routes.get('/product/register', productController.register);                    // rota GET de registro 
routes.post('/product/register', productController.registerPost);               // rota POST de registro 
routes.get('/product/edit/:id', productController.editId);                      // rota GET de editar informações de produto
routes.post('/product/edit/:id', productController.edit);                       // rota POST de editar informações do produto
routes.get('/product/delete/:id', productController.delete);                    // deletar produto

// CRUD estoque
routes.get('/stock', stockController.index);                                    // rota GET do estoque
routes.get('/stock/register', stockController.registro);                        // rota GET de registro
routes.post('/stock/register', stockController.registerPost);                   // rota POST de registro
routes.get('/stock/edit/:id', stockController.indexId);                         // rota GET de editar informações de estoque
routes.post('/stock/edit/:id', stockController.edit);                           // rota POST de editar informações de estoque
routes.get('/stock/exit', stockController.exit);                                // rota GET de saida
routes.post('/stock/exit', stockController.exitPost);                           // rota POST de saida
routes.get('/stock/delete/:id', stockController.delete);                        // deletar estoque

// CRUD localização
routes.get('/location', locationController.index);                              // rota GET de localização
routes.get('/location/register', locationController.register)                   // rota GET de registro
routes.post('/location/register', locationController.registerPost);             // rota POST de registro
routes.get('/location/edit/:id', locationController.indexId)                    // procurando pelo name
routes.post('/location/edit/:id', locationController.edit);                     // editando informações de localização
routes.get('/location/delete/:id', locationController.delete)                   // deletar localização

// CRUD tipo de produto
routes.get('/productType', typeProductController.index);                        // rota GET de todos os tipos de produtos
routes.get('/productType/register', typeProductController.register)             // rota GET de registro
routes.post('/productType/register', typeProductController.registerPost);       // rota POST de registro
routes.get('/productType/edit/:id', typeProductController.indexId)              // rota GET de editar informações de tipos de produtos
routes.post('/productType/edit/:id', typeProductController.edit);               // rota POST de editar informações de tipos de produtos 
routes.get('/productType/delete/:id', typeProductController.delete)             // deletar tipo de produto



module.exports = routes