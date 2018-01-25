const passport = require('passport');
const passportJwtStrategy = require('passport-jwt').Strategy;
const passportExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../../models/user');
const conf = require('./../../../configs');

const params = {
    secretOrKey: conf.jwrSecret,
    jwtFromRequest: passportExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new passportJwtStrategy(params, function(jwt_payload, done) {
    let id = jwt_payload.id;

    let callback = function (err, user) {
        if (err) {
            return done(err);
        }

        return done(null, user);
    }

    User.findById(id, callback);
});

passport.use(strategy);

module.exports = passport;
