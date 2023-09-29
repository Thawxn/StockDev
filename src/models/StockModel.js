const connection = require('../database/db');
const { Sequelize } = require('sequelize');

// importando models
const Location = require('./LocationModel');
const Product = require('./ProductModel');

const Stock = connection.define('stock', {
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: Product, key: 'id'}
    },
    id_location: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: Location, key: 'id'}
    }
})


// Stock.sync({ force: true })

module.exports = Stock