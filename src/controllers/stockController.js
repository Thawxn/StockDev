const Stock = require('../models/StockModel');
const Location = require('../models/LocationModel');
const Product = require('../models/ProductModel');

// rota GET de estoque
exports.index = async (req, res) => {
    await Stock.findAll({
        include: [{model: Location}, {model: Product}]
    }).then(stock => {
        res.render('stock/stock', {stock: stock})
    }).catch(err => {
        res.json(err)
    })
}

// rota GET de registro
exports.registro = async (req, res) => {

    const product =  await Product.findAll()
    const location = await Location.findAll()

    try {
        res.render('stock/register', {product: product, location: location})
    } catch (error) {
        res.render('404')
        console.error('Error: ', error)
    }
}

// rota POST de registro
exports.registerPost = async (req, res) => {
    const {
        amounts,
        locationId,
        productId
    } = req.body

    if(amounts === '' && locationId === '' && productId === '') {
        res.json({err: 'specific fields will be filled.'})
    }

    const stock = await Stock.findOne({where: { productId, locationId }})

    try {

        if(stock == undefined) {
            await Stock.create({
                amount: amounts,
                locationId,
                productId
            }).then(() => {
                res.redirect('/stock')
            }).catch(() => {
                res.json({err: 'error when trying to register stock.'})
            })
        } 
    
        if(stock) {
            let amount = parseInt(amounts) + parseInt(stock.amount)
            
            await Stock.findOne({where: { productId, locationId }}).then(() => {
                if(amount !== null) {
                    Stock.update({amount}, {where: {productId, locationId}})
                }
    
                res.redirect('/stock')
            }).catch(err => {
                console.log(err)
            })
        } 

    } catch (error) {
        console.err('error found: ', error)
    }
}

// visualizando um stock
exports.indexId = async (req, res) => {
    const { id } = req.params;

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await Stock.findOne({
            where: {id},
            include: [{model: Location}, {model: Product}]
        }, ).then(data => {
            res.json(data)
        }).catch(() => {
            res.json({err: 'stock not found.'})
        })
    }
}

// editando informações
exports.edit = async (req, res) => {
    const { id } = req.params;
    const {
        amount,
        locationId,
        productId
    } = req.body;
    try {
        if(isNaN(id)) {
            res.sendStatus(400)
        } else {
            await Stock.findOne({raw: true, Where: {id}}).then(data => {
                if(data == undefined) {
                    res.sendStatus(404)
                } else {
                    if(amount !== null) {
                        Stock.update({amount}, {where: {id}})
                    }
    
                    if(locationId !== null) {
                        Stock.update({locationId}, {where: {id}})
                    }
    
                    if(productId !== null) {
                        Stock.update({productId}, {where: {id}})
                    }
    
                    res.json({ok: 'stock edited successfully.'})
                }
            }).catch(() => {
                res.json({err: 'product not found'})
            })
        }    
    } catch (err) {
        console.err('error found: ', err)
    }
    
}

// deletando
exports.delete = async (req, res) => {
    const { id } = req. params;

    try {
        if(isNaN(id)) {
            res.sendStatus(400)
        } else {
            await Stock.destroy({where: { id }}).then(() => {
                res.json({ok: 'stock successfully deleted.'})
            }).catch(() => {
                res.json({err: 'stock not found.'})
            })
        }
    } catch (err) {
        console.error('error found: ', err)
    }
}