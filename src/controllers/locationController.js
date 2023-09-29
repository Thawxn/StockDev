const Location = require('../models/LocationModel');

// vizualizar todos
exports.index = async (req, res) => {
    await Location.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
}


// procurando pelo nome
exports.indexId = async (req, res) => {
    const { name } = req.params

    if(name !== undefined) {
        await Location.findOne({where: {name}}).then(data => {
            res.json(data)
        }).catch(() => {
            res.json({err: 'Location not found.'})
        })
    }
}

// registrar
exports.register = async (req, res) => {
    const { name } = req.body

    try {
        if(name !== null ) {
            await Location.findOne({where: {name}}).then(data => {
                if(data == undefined){
                    Location.create({name}).then(() => {
                        res.json({ok: 'success in registering location.'})
                    }).catch(() => {
                        res.json({err: 'err when registering location.'})
                    })
                } else {
                    res.json({err: 'location already registered.'}) 
                }
            }).catch(() => {
                res.json({err: 'location already registered.'}) 
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
        await Location.findOne({raw: true, where: {id}}).then(data => {

            if (data == undefined){
                res.sendStatus(404)
            } else {

                if(name != null){
                    Location.update({name}, {where: {id}})
                }

                req.json({ok: 'location edited successfully.'})

            }

        }).catch(() => {
            res.json({err: 'location not found.'})
        })
    } 
}

// excluir
exports.delete = async (req, res) => {
    const { id } = req.params

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await Location.destroy({where: {id}}).then(() => {
            res.json({ok: 'location deleted successfully.'})
        }).catch(() => {
            res.json({err: 'localiza not found'})
        })
    }
}