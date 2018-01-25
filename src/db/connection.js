let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/light_lawliet')
mongoose.connect('mongodb://rsouza:Ramon2017@ds241025.mlab.com:41025/light-lawliet', { useMongoClient: true }, function (err) {
    if (err) {
        console.log('Mongoose error connection => ', err);
    }

    console.log('Mongoose connected');
});

module.exports = mongoose;