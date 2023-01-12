const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../Models/Usermodel')
const jwt = require("jsonwebtoken");

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.user_id);
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });

        } catch (err) {
            return done(err);
        }
    }
));

