const express = require('express')
const session = require('express-session');
const app = express()
const port = 3000
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

app.use(express.json());

require('dotenv').config();

app.use(session(
    { secret: 'my-secret',
    resave: false,
    saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/', (req, res) => { 
  res.send (req.session.user != undefined ? `Logged in as ${req.session.user.username}` : "logged Out")
});

app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}), 
  (req, res) =>{
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// route
const baseRoute = require('./routes/base-route');
app.use('/base', baseRoute);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
