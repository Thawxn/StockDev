const connection = require('../database/db');
const { Sequelize } = require('sequelize');

const Location = connection.define('location', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Location.sync({ force: true })

module.exports = Location
