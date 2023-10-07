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
    const data = await TypeProduct.findAll()

    try {
        res.render('product/register', {data: data})
    } catch (error) {
        res.render('404')
        console.error('Error: ', error)
    }
}

// rota POST de registro 
exports.registerPost = async (req, res) => {
    const { 
        barcode,
        name,
        price,
        typeProductId 
    } = req.body

    if(barcode === '' && name === '' && price === '' && typeProductId === '') {
        req.flash('err', 'Necessário preencher todos os campos')
        req.session.save(() => res.redirect('/product/register'));
    }

    const product = await Product.findOne({where: {barcode}})

    try {
        if(product == undefined) {
            await Product.create({
                barcode,
                name,
                price,
                typeProductId
            }).then(() => {
                req.flash('success', 'Produto lançado com sucesso')
                req.session.save(() => res.redirect('/product/register'));
            }).catch(() => {
                req.flash('err', 'Error ao tentar lançar produto.')
                req.session.save(() => res.redirect('/product/register'));
            })
        }

        if (product) {
            req.flash('err', 'Produto já registrado')
            req.session.save(() => res.redirect('/product/register'));
        }
        

    } catch (error) {
        res.render('404')
        console.log(error)
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

    const productId = await Product.findOne({where: {id: id}})

    if(isNaN(id)) {
        res.sendStatus(400)
    }

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
    
        req.flash('success', 'Produto lançado com sucesso')
        req.session.save(() => res.redirect(`/product/edit/${productId.id}`));
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