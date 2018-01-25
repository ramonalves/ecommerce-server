const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const mongoose = require('mongoose')
const Customer = require('./../src/models/customer')
require('sinon-mongoose')

describe('Customer', () => {
    it('Should create a new Customer', (done) => {
        let mock = sinon.mock(
            new Customer({
                name: "name",
                password: "password",
                slug: "slug",
                email: "email",
                cpf: "cpf",
                celphone: "celphone",            
                address: {
                   cep: "06410140",
                   street:"Rua 1",
                   number: 10,
                   city:"Barueri",
                   neightborhood:"Jd",
                   uf:"SP"
                }
            })
        )

        let customer = mock.object //objeto necessario para criação

        mock.expects('save').yields(null, {
            status: true,
            data: {
                name: "name",
                password: "password",
                slug: "slug",
                email: "email",
                cpf: "cpf",
                celphone: "celphone",            
                address: {
                   cep: "06410140",
                   street:"Rua 1",
                   number: 10,
                   city:"Barueri",
                   neightborhood:"Jd",
                   uf:"SP"
                }
            }
        })

        customer.save((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.equal(true)
            expect(result.data).to.be.an('object')
            done()
        });
    })

    it('Should remove one Customer by id', (done) => {
        let mock = sinon.mock(Customer)
        
        mock.expects('findOneAndRemove').withArgs({
            _id: '59f6351bea564d1a0824e30d'
        }).yields(null, {
            status: true,
            _id: '59f6351bea564d1a0824e30d'
        })

        Customer.findOneAndRemove({
            _id: '59f6351bea564d1a0824e30d'
        }, (err, result) => {
            mock.verify();
            mock.restore();

            expect(result.status).to.equal(true);

            done()
        })
    })

    it('should return all customers', (done) => {
        let mock = sinon.mock(Customer)

        mock.expects('find').yields(null, {
            status: true,
            data: []
        })

        Customer.find((err, result) => {
            mock.verify()
            mock.restore()

            expect(result.status).to.be.true
            expect(result.data).to.be.an('array')
            done()
        })
    })
})