const Location = require('../models/LocationModel');

// rota GET de localzaão
exports.index = async (req, res) => {
    await Location.findAll().then(data => {
        res.render('location/location', {data})
    }).catch(err => {
        console.log(err)
    })
}

// rota GET de registro
exports.register = async (req, res) => {
    res.render('location/register')
}

// rota POST de registro
exports.registerPost = async (req, res) => {
    const { name } = req.body

    if(name == '') {
        req.flash('err', 'Necessário preencher todos os campos.')
        req.session.save(() => res.redirect('/location/register'));
    }

    const location = await Location.findOne({where: {name}})

    try {

        if(location == undefined) {
            await Location.create({
                name
            }).then(() => {
                req.flash('success', 'Localização cadastrado com sucesso.')
                req.session.save(() => res.redirect('/location/register'));
            }).catch(() => {
                req.flash('err', 'Erro ao tentar cadastrar localização.')
                req.session.save(() => res.redirect('/location/register'));
            })
        }
    
        if(location) {
            req.flash('err', 'Localização já cadastrada no sistema.')
            req.session.save(() => res.redirect('/location/register'));
        }

    } catch (error) {
        res.render('404')
    }

}

// rota GET de editar informações de localização
exports.indexId = async (req, res) => {
    const { id } = req.params

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await Location.findOne({where: {id}}).then(data => {
            res.render('location/edit', {data})
        })
    }
}

// rota POST de editar informações de localização
exports.edit = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const locationId = await Location.findOne({raw: true, where: {id}})
    const location = await Location.findOne({raw: true, where: {name}})

    if (isNaN(id)){
        res.sendStatus(400)
    } 
    
    try {
        if(location) {
            req.flash('err', 'Localização já existe no sistema.')
            req.session.save(() => res.redirect(`/location/edit/${locationId.id}`));
        }

        if(location == undefined) {
            if(name != null){
                await Location.update({name}, {where: {id}})
            }

            req.flash('success', 'Localização editado com sucesso')
            req.session.save(() => res.redirect(`/location/edit/${locationId.id}`));
        }
        
    } catch (error) {
        res.render('404')
        console.error('err', error)
    }
    
}

// excluir
exports.delete = async (req, res) => {
    const { id } = req.params

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        await Location.destroy({where: {id}}).then(() => {
            res.redirect('/location')
        }).catch(() => {
            res.json({err: 'localiza not found'})
        })
    }
}