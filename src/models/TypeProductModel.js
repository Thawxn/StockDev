const connection = require('../database/db');
const { Sequelize } = require('sequelize');

const TypeProduct = connection.define('type_product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// TypeProduct.sync({ force: true })

module.exports = TypeProduct