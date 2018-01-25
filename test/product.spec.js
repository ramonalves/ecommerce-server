const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const mongoose = require('mongoose')
const Product = require('./../src/models/product')
require('sinon-mongoose')

describe('Product', () => {
    it('Should create a new Product', (done) => {
        let mock = sinon.mock(
            new Product({
                name: 'Product notebook',
                description: 'Categoria de notebook',
                slug: 'notebook'
            })
        )

        let product = mock.object //objeto necessario para criação

        mock.expects('save').yields(null, {
            status: true,
            data: {
                name: "notebook",
                slug: "notebook",
                description: "Categoria de notebook"
            }
        })

        product.save((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.equal(true)
            expect(result.data).to.be.an('object')
            done()
        })
    })

    it('Should remove one product by id', (done) => {
        let mock = sinon.mock(Product)
        
        mock.expects('findOneAndRemove').withArgs({
            _id: '59f6351bea564d1a0824e30d'
        }).yields(null, {
            status: true,
            _id: '59f6351bea564d1a0824e30d'
        })

        Product.findOneAndRemove({
            _id: '59f6351bea564d1a0824e30d'
        }, (err, result) => {
            mock.verify();
            mock.restore();

            expect(result.status).to.equal(true);

            done();
        })
    })

    it('should return all products', (done) => {
        let mock = sinon.mock(Product)

        mock.expects('find').yields(null, {
            status: true,
            data: []
        })

        Product.find((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.be.true
            expect(result.data).to.be.an('array')
            done()
        })
    })
})