const Validator = require('./../helpers/data-validator')
const Customer = require('./../db/customer/crud')
const slugfy = require('./../helpers/slugfy')
const md5 = require('md5')

exports.get = async(req, res, next) => {
    try {
        var data = await Customer.get()
        res.status(200).json({status: true, data: data})
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await Customer.getById(req.params.id)
        res.status(200).json({status: true, data: data})
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.add = async(req, res, next) => {
    let contract = new Validator()
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // invalid data
    if (!contract.isValid()) {
        res.status(400).json(contract.errors()).end()
        return
    }

    try {
        let slug = slugfy(req.body.name)        

        let data = await Customer.create({
            name: req.body.name,
            password: md5(req.body.password + global.PWD_KEY),
            slug: slug,
            email: req.body.email,
            cpf: req.body.cpf,
            celphone: req.body.celphone,            
            address: req.body.address
            
        })
        res.status(201).json({
            status: true, 
            data: data
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.edit = async(req, res, next) => {
    try {
        let data = await Customer.update(req.params.id, req.body)
        res.status(200).json({
            status: true, 
            data: data
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.delete = async(req, res, next) => {
    try {
        await Customer.delete(req.params.id)
        res.status(204).json({
            status: true
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}