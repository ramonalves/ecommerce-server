const validator = require('./../helpers/data-validator')
const slugfy = require('./../helpers/slugfy')
const Product = require('./../db/product/crud')
// const azure = require('azure-storage')
// const guid = require('guid')
// var config = require('../config')

exports.get = async(req, res, next) => {
    try {
        var data = await Product.get()
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

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await Product.getBySlug(req.params.slug)
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
        var data = await Product.getById(req.params.id)
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

exports.getByCategory = async(req, res, next) => {
    try {
        var data = await Product.getByCategory(req.params.id)
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
    let contract = new validator()
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.hasPositive(req.body.price, 0, 'O preço deve ser maior que zero')

    // invalid data
    if (!contract.isValid()) {
        res.status(400).json(contract.errors()).end()
        return
    }

    try {
        let filename = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'

        if (req.files && req.files.length) {
            filename = req.files && req.files[0] && req.files[0].location
        }

        let slug = slugfy(req.body.name)        

        let data = await Product.create({
            name: req.body.name,
            slug: slug,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            image: filename,
            category: req.body.category
        })
        res.status(201).json({
            status: true,
            data
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
        let data = await Product.update(req.params.id, req.body)
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

exports.delete = async(req, res, next) => {
    try {
        await Product.delete(req.params.id)
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