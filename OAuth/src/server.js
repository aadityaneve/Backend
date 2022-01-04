const connect = require('./config/db');
const express = require('express');
const app = express();
app.use(express.json());

const passport = require('./config/passport');
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Home Page');
});

passport.serializeUser(function ({ user, token }, done) {
    done(null, { user, token });
});
passport.deserializeUser(function (user, done) {
    done(err, user);
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'email',
            'profile',
        ],
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        successRedirect: '/',
    }),
    function (req, res) {
        return res
            .status(201)
            .json({ user: req.user.user, token: req.user.token });
    }
);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/auth/google/failure', function (req, res) {
    return res.send('Something went wrong');
});

const start = async () => {
    await connect();
    app.listen(3001, () => {
        console.log('LISTENING ON SERVER 3001');
    });
};

module.exports = { start, app };
