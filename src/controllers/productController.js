const Product = require('../models/ProductModel');
const TypeProduct = require('../models/TypeProductModel');

// rota GET de produtos
exports.index = async (req, res) => {
    await Product.findAll({include: [{model: TypeProduct}]}).then(products => {
        res.render('product/products', {product: products})
    }).catch(err => {
        res.render('404')
        console.log(err)
    })
}

// rota GET de registro
exports.register = async (req, res) => {
    await TypeProduct.findAll().then(data => {
        res.render('product/register', {data: data})
    }).catch(err => {
        console.log(err)
    })
}

// rota POST de registro 
exports.registerPost = async (req, res) => {
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
                        res.redirect('/product')
                    }).catch(() => {
                        res.json({err: 'product already registered.'})
                    })
                } else {
                    res.json({err: 'the fields must be filled in.'})
                }
            }).catch(() => {
                res.json({err: 'the fields must be filled in.'})   
            })
        } else {
            res.json({err: 'the fields must be filled in.'})
        }
    } catch (err) {
        res.render('404')
        console.log(err)
    }
}

// rota GET de editar informações de produto
exports.editId = async (req, res) => {
    const { id } = req.params
    await Product.findOne({where: {id: id}, include: [{model: TypeProduct}]}).then(product => {
        res.render('product/edit', {product: product})
    }).catch(err => {
        res.render('404')
        console.log(err)
    })
}

// rota POST de editar informações do produto
exports.edit = async (req, res) => {
    const { id } = req.params
    const { 
        barcode,
        name,
        price,
        typeProductId
    } = req.body

    try {
        if(barcode !== null) {
            await Product.update({barcode}, {where: {id}})
        }
    
        if(name !== null) {
            await Product.update({name}, {where: {id}})
        }
    
        if(price !== null) {
            await Product.update({price}, {where: {id}})
        }
    
        if(typeProductId != null) {
            await Product.update({typeProductId}, {where: {id}})
        }
    
        res.redirect('/product')
    } catch (err) {
        res.render('404')
        console.err('error found: ',err)
    }

    
            
}

// delete
exports.delete = async (req, res) => {
    const { id } = req.params;

    if(isNaN(id)){
        res.sendStatus(400)
    } else {
        await Product.destroy({where: {id}}).then(() => {
            res.redirect('/product')
        })
    }
}