const Product = require('../models/ProductModel');
const TypeProduct = require('../models/TypeProductModel');

// visualizar 
exports.index = async (req, res) => {
    await Product.findAll({include: [{model: TypeProduct}]}).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
}

// visualizar um produto
exports.indexId = async (req, res) => {
    const { _id } = req.params
    await Product.findOne({where: {id: _id}, include: [{model: TypeProduct}]}).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
}

// registrar 
exports.register = async (req, res) => {
    const { 
        barcode,
        name,
        price,
        typeProductId 
    } = req.body

    try {
        if(barcode != '' && name != '' && price != '' && typeProductId != '') {
            await Product.findOne({where: {barcode}}).then(data => {
                if(data == undefined){
                    Product.create({
                        barcode,
                        name,
                        price,
                        typeProductId
                    }).then(() => {
                        res.json({ok: 'product registered successfully.'})
                    }).catch(() => {
                        res.json({err: 'product already registered.'})
                    })
                } else {
                    res.json({err: 'the fields must be filled in.'})
                }
            })
        } else {
            res.json({err: 'the fields must be filled in.'})
        }
    } catch (err) {
        console.log(err)
    }
}

// editando informações
exports.edit = async (req, res) => {
    const { id } = req.params;
    const { 
        barcode,
        name,
        price,
        typeProductId
    } = req.body

    if(isNaN(id)){
        res.sendStatus(400)
    } else {
        await Product.findOne({raw: true, where: {id}}).then(data => {
            if(data == undefined) {
                res.sendStatus(404)
            } else {
                if(barcode !== null) {
                    Product.update({barcode}, {where: {id}})
                }

                if(name !== null) {
                    Product.update({name}, {where: {id}})
                }

                if(price !== null) {
                    Product.update({price}, {where: {id}})
                }

                if(typeProductId != null) {
                    Product.update({typeProductId}, {where: {id}})
                }

                res.json({ok: 'product edited successfully.'})
            }
        }).catch(() => {
            res.json({err: 'product not found'})
        })
    }
}

// deletando
exports.delete = async (req, res) => {
    const { id } = req.params;

    if(isNaN(id)){
        res.sendStatus(400)
    } else {
        await Product.destroy({where: {id}}).then(() => {
            res.json({ok: 'product deleted successfully.'})
        })
    }
}