const TypeProduct = require('../models/TypeProductModel');

// vizualizar todos
exports.index = async (req, res) => {
    await TypeProduct.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
}


// procurando pelo nome
exports.indexId = async (req, res) => {
    const { name } = req.params

    if(name !== undefined) {
        await TypeProduct.findOne({where: {name}}).then(data => {
            res.json(data)
        }).catch(() => {
            res.json({err: 'product type not found.'})
        })
    }
}

// registrar
exports.register = async (req, res) => {
    const { name } = req.body

    try {
        if(name !== null ) {
            await TypeProduct.findOne({where: {name}}).then(data => {
                if(data == undefined){
                    TypeProduct.create({name}).then(() => {
                        res.json({ok: 'product type successfully registered.'})
                    }).catch(() => {
                        res.json({err: 'err registering product type.'})
                    })
                } else {
                    res.json({err: 'type of product already registered.'}) 
                }
            }).catch(() => {
                res.json({err: 'type of product already registered.'}) 
            }) 
        }
    } catch(err) {
        res.json(err)
    }
}


// editar
exports.edit = async (req, res) => {
    const { id } = req.params
    const { name } = req.body


    if (isNaN(id)){
        res.sendStatus(400)
    } else {
        await TypeProduct.findOne({raw: true, where: {id}}).then(data => {

            if (data == undefined){
                res.sendStatus(404)
            } else {

                if(name != null){
                    TypeProduct.update({name}, {where: {id}})
                }

                res.json({ok: 'product type edited successfully.'})

            }

        }).catch(() => {
            res.json({err: 'product type not found.'})
        })
    } 
}

// deletando
exports.delete = async (req, res) => {
    const { id } = req.params

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await TypeProduct.destroy({where: {id}}).then(() => {
            res.json({ok: 'product type deleted successfully.'})
        }).catch(() => {
            res.json({err: 'product type not found.'})
        })
    }
}