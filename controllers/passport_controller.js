var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require("../models");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

var GOOGLE_CLIENT_ID = "147613377683-3fcc477omv6kpfvmc4a29g47l59hh51u.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "BtEiMzY18rOgPscPn2RtDxmB";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://pacific-sands-66113.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile._json.image.url);
    var User = db.User;
    //console.log(accessToken);
    //console.log(profile.id);
       User.findOrCreate({ where: {googleId: profile.id }, defaults: {
        fName: profile.name.givenName,
        lName: profile.name.familyName,
        isAdmin: false,
        email: "voltx180@gmail.com",
        picture: profile._json.image.url,
       }}).then(function(data) {
         return done (null,data);
       });
  }
));


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback

module.exports = function(app){
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] , immediate: false}));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });
}