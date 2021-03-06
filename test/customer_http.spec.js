const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const Customer = require('./../src/models/customer')

chai.use(chaiHttp)
const expect = chai.expect
const request = chai.request
const uri = 'http://localhost:3000'

require('sinon-mongoose')

describe('Customer Request', () => {
    it ('should make a request and return a list of customers', (done) => {
        request(uri)
            .get('/api/customers')
            .end((err, res) => {
                if (!err) {
                    expect(res.body.status).to.be.true
                    expect(res.body.data).to.be.an('array')
                    done()
                }
                done()
            })
    })

})