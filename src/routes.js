const { Router } = require('express')

const routes = new Router()

routes.get('/', (req, res) => {
    res.send('Ola Mundo!')
})

module.exports = routes