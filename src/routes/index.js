const passport = require('./../auth/auth')

const auth = require('./auth')
const products = require('./products')
const categories = require('./categories')
const customers = require('./customers')

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' })
    })

    app.use('/api', passport.authenticate('jwt', {session: false}))

    auth(app)
    products(app)
    categories(app)
    customers(app)
}
