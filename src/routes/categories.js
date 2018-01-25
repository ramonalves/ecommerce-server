module.exports = function (app) {
    const controller = require('./../controllers/category');

    app.get('/api/categories', controller.get);
    app.post('/api/categories', controller.add);
    app.get('/api/categories/:id', controller.getById);
    app.get('/api/categories/site/:slug', controller.getBySlug);
    app.put('/api/categories/:id', controller.edit);
    app.delete('/api/categories/:id', controller.delete);
}
