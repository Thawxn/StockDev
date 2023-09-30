const Stock = require('../models/StockModel');
const Location = require('../models/LocationModel');
const Product = require('../models/ProductModel');

// visualizar
exports.index = async (req, res) => {
    await Stock.findAll({
        include: [{model: Location}, {model: Product}]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
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

// registrar
exports.register = async (req, res) => {
    const {
        amount,
        locationId,
        productId
    } = req.body

    try {
        if(amount !== '' && locationId !== '' && productId !== '') {
            await Stock.findOne({where: {productId, locationId}}).then(data => {
                if(data == undefined) {
                    Stock.create({
                        amount,
                        locationId,
                        productId
                    }).then(() => {
                        res.json({ok: 'stock registered successfully.'})
                    }).catch(() => {
                        res.json({err: 'error when trying to register stock.'})
                    })
                } else {
                    res.json({err: 'stock already registered'})
                }
            }).catch(() => {
                res.json({err: 'stock already registered'})    
            })

        } else {
            res.json({err: 'specific fields will be filled.'})
        }
    } catch(err) {
        console.err('error found: ',err)   
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