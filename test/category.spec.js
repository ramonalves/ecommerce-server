const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const mongoose = require('mongoose')
const Category = require('./../src/models/category')
require('sinon-mongoose')

describe('Category', () => {
    it('Should create a new category', (done) => {
        let mock = sinon.mock(
            new Category({
                name: 'Category Informática',
                description: 'Categoria de informatica',
                slug: 'informatica'
            })
        )

        let category = mock.object //objeto necessario para criação

        mock.expects('save').yields(null, {
            status: true,
            data: {
                name: "Informática",
                slug: "informatica",
                description: "Categoria de informatica"
            }
        })

        category.save((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.equal(true)
            expect(result.data).to.be.an('object')
            done()
        })
    }),

    it('Should remove one category by id', (done) => {
        let mock = sinon.mock(Category)
        
        mock.expects('findOneAndRemove').withArgs({
            _id: '59f6351bea564d1a0824e30d'
        }).yields(null, {
            status: true,
            _id: '59f6351bea564d1a0824e30d'
        })

        Category.findOneAndRemove({
            _id: '59f6351bea564d1a0824e30d'
        }, (err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.equal(true)

            done()
        })
    })

    it('should return all categories', (done) => {
        let mock = sinon.mock(Category)

        mock.expects('find').yields(null, {
            status: true,
            data: []
        })

        Category.find((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.be.true
            expect(result.data).to.be.an('array')
            done()
        })
    })
})