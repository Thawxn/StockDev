const app = require('./app');

app.on('Pronto', () => {
    app.listen(2000, () => {
        console.log('Acessar: http://localhost:2000/')
        console.log('Servidor funcionando com sucesso.')
    })    
})
