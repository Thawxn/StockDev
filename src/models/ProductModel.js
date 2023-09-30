const connection = require('../database/db');
const { Sequelize } = require('sequelize');

// importando models
const TypeProduct = require('./TypeProductModel');

const Product = connection.define('product', {
    barcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


// relacionamento entre tabelas
Product.belongsTo(TypeProduct)
TypeProduct.hasMany(Product)

// Product.sync({ force: true })

module.exports = Product