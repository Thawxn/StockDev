const connection = require('../database/db');
const { Sequelize } = require('sequelize');

// importando models
const Location = require('./LocationModel');
const Product = require('./ProductModel');

const Stock = connection.define('stock', {
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

// Relacionamento entre tabelas
Stock.belongsTo(Location);          
Stock.belongsTo(Product);
Location.hasMany(Stock);
Product.hasMany(Stock)

// Stock.sync({ force: true })

module.exports = Stock