const TypeProduct = require('../models/TypeProductModel');

// vizualizar todos
exports.index = async (req, res) => {
    await TypeProduct.findAll().then(data => {
        res.render('typeProduct/typeProduct', {data})
    }).catch(err => {
        console.log(err)
    })
}

// vizualizar todos
exports.register = async (req, res) => {
    res.render('typeProduct/register')
}

// registrar
exports.registerPost = async (req, res) => {
    const { name } = req.body

    if(name === '') {
        req.flash('err', 'Necessário preencher todos os campos')
        req.session.save(() => res.redirect('/productType/register'));
    }

    const typeProduct = await TypeProduct.findOne({where: {name}})

    try {

        if(typeProduct == undefined) {
            await TypeProduct.create({
                name
            }).then(() => {
                req.flash('success', 'Tipo de produto cadastrado com sucesso.')
                req.session.save(() => res.redirect('/productType/register'));
            }).catch(() => {
                req.flash('err', 'Error ao tentar registrar tipo de produto.')
                req.session.save(() => res.redirect('/productType/register'));
            })
        }

        if(typeProduct) {
            req.flash('err', 'Tipo de produto já cadastrado.')
            req.session.save(() => res.redirect('/productType/register'));
        }
    } catch(err) {
        res.json(err)
    }
}

// procurando pelo id
exports.indexId = async (req, res) => {
    const { id } = req.params
    
    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await TypeProduct.findOne({where: {id}}).then(data => {
          res.render('typeProduct/edit', {data})
        })
    }
    
}

// editar
exports.edit = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const typeProductId = await TypeProduct.findOne({raw: true, where: {id}})
    const typeProduct = await TypeProduct.findOne({raw: true, where: {name}})

    if (isNaN(id)){
        res.sendStatus(400)    
    } 

    try {
        if(typeProduct) {
            req.flash('err', 'Tipo de Produto já existe no sistema.')
            req.session.save(() => res.redirect(`/productType/edit/${typeProductId.id}`));
        }

        if (typeProduct == undefined) {
            if(name != null){
                await TypeProduct.update({name}, {where: {id}})
            }
        
            req.flash('success', 'Tipo de Produto editado com sucesso')
            req.session.save(() => res.redirect(`/productType/edit/${typeProductId.id}`));
        }

    } catch (error) {
        res.render('404')
        console.err('error found: ', error)
    }

}

// deletando
exports.delete = async (req, res) => {
    const { id } = req.params

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await TypeProduct.destroy({where: {id}}).then(() => {
            res.redirect('/productType')
        })
    }
}