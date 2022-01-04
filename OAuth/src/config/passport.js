require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Seller = require('../models/seller.model');
const newToken = require('../controllers/auth.controller');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
            callbackURL: 'http://localhost:3001/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            let seller = await Seller.findOne({ email: profile._json.email })
                .lean()
                .exec();
            if (!seller) {
                seller = await Seller.create({
                    first_name: profile?._json?.given_name,
                    last_name: profile?._json?.family_name,
                    email: profile?._json?.email,
                });
            }
            done(null, seller);
        }
    )
);

module.exports = passport;
