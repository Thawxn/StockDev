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
            res.render('stock/edit', {data: data, lotacion: Location, product: Product})
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

    if(isNaN(id)) {
        res.sendStatus(400)
    }

    const stock = await Stock.findOne({raw: true, where: {id}})

    try {
        if(stock !== undefined) {
            if(amount !== null) {
                await Stock.update({amount}, {where: {id}})
            }
    
            if(locationId !== null) {
                await Stock.update({locationId}, {where: {id}})
            }
    
            if(productId !== null) {
                await Stock.update({productId}, {where: {id}})
            }
    
            res.redirect('/stock')
        } else {
            res.json({err: 'stock information not found'})
        }
    } catch (error) {
        console.err('error found: ', error)
    }
    
}

// rota GET de registro
exports.exit = async (req, res) => {

    const product =  await Product.findAll()
    const location = await Location.findAll()

    try {
        res.render('stock/exit', {product: product, location: location})
    } catch (error) {
        res.render('404')
        console.error('Error: ', error)
    }
}

// rota POST de registro
exports.exitPost = async (req, res) => {
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
            res.json({fail: 'product does not exist in stock.'})
        } 
    
        if(stock) {
            let amount = parseInt(stock.amount) - parseInt(amounts)

            if(amount < 0) {
                res.json({err: 'there is no such quantity in stock.'})
            } else {
                await Stock.update({amount}, {where: {productId, locationId}})

                res.redirect('/stock')
            }
        } 

    } catch (error) {
        console.err('error found: ', error)
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