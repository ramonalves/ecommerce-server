const jwt = require('jwt-simple');;
const User = require('../models/user');
const config = require('../../configs');
const md5 = require('md5')

module.exports = function (app) {
    return {
        token: (req, res) => {
            let user = req.body;
            let query = {email: user.username, password: md5(user.password + global.PWD_KEY)};

            let callback = function (err, user) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        err: err
                    });
                }

                if (!user) {
                    return res.status(401).send('Unauthorized');
                }

                let payload = {id: user.id};
                let token = jwt.encode(payload, config.jwrSecret);
                return res.status(200).json({token: token});
            }

            user = User.findOne(query, callback);
        },
        me: (req, res) => {
            res.status(200).json({
                status: true,
                user: req.user
            });
        },
        register: (req, res) => {
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.PWD_KEY),
            }

            let callback = function (err, user) {
                if (err) {
                    return res.status(422).json({
                        status: false,
                        err: err
                    });
                }
                return res.status(201).json({
                    status: true,
                    data: user
                });
            }

            User.create(data, callback);
        },
        edit: (req, res) => {
            let user = req.body;

            let callback = function (err, user) {
                if (err) {
                    return res.status(422).json({
                        status: false,
                        err: err
                    });
                }

                return res.status(200).json({
                    status: true,
                    data: user
                });
            }
            
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: md5(user.password + global.PWD_KEY),
            }
            User.findByIdAndUpdate(req.params.id, data, callback)
        },
    }
}
