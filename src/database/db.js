require('dotenv').config()

const Sequelize = require('sequelize')

const connection = new Sequelize('estoques', 'root', process.env.PASS, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
