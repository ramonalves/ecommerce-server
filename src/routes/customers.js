module.exports = function (app) {
    const controller = require('./../controllers/customer');

    app.get('/api/customers', controller.get);
    app.post('/api/customers', controller.add);
    app.get('/api/customers/:id', controller.getById);
    app.put('/api/customers/:id', controller.edit);
    app.delete('/api/customers/:id', controller.delete);
}
