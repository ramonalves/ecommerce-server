module.exports = function (app) {
    const controller = require('./../controllers/product')
    const s3Upload = require('./middleware/s3_upload')

    app.get('/api/products', controller.get)
    app.post('/api/products', s3Upload.array('images3', 1), controller.add)
    app.get('/api/products/:id', controller.getById)
    app.get('/api/products/site/:slug', controller.getBySlug)
    app.get('/api/products/categories/:id', controller.getByCategory)
    app.put('/api/products/:id', controller.edit)
    app.delete('/api/products/:id', controller.delete)
}
