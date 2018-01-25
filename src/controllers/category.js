const DataValidator = require('./../helpers/data-validator')
const Category = require('./../db/category/crud')
const slugfy = require('./../helpers/slugfy')

exports.get = async(req, res, next) => {
    try {
        var data = await Category.get()
        res.status(200).json({
            status: true,
            data
        })
    } catch (e) {
        res.status(500).json({
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.'
        })
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await Category.getBySlug(req.params.slug)
        res.status(200).json({
            status: true,
            data
        })
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
        var data = await Category.getById(req.params.id)
        res.status(200).json({
            status: true,
            data
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.add = async(req, res, next) => {
    let contract = new DataValidator()
    contract.hasMinLen(req.body.name, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    // invalid date
    if (!contract.isValid()) {
        res.status(400).json(contract.errors()).end()
        return
    }

    try {
        let slug = slugfy(req.body.name)    

        let data = await Category.create({
            name: req.body.name,
            slug: slug,
            description: req.body.description
        })
        res.status(201).json({
            status: true,
            data
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno e não foi possível completar a requisição.',
            error: e
        })
    }
}

exports.edit = async(req, res, next) => {
    try {
        req.body.slug = slugfy(req.body.name)
        let result = await Category.update(req.params.id, req.body)
        res.status(200).json({
            status: true,
            result
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
        await Category.delete(req.params.id)
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