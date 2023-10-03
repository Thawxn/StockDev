const app = require('./app');

app.on('OK', () => {
    app.listen(2000, () => {
        console.log('Acessar: http://localhost:2000/product')
        console.log('Servidor funcionando com sucesso.')
    })    
})
