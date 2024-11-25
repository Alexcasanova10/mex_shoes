const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User.js'); 
const jwt = require("jsonwebtoken");

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
  },

  async (accessToken, refreshToken, profile, done) => {
    console.log("Profile:", profile);

    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          isAdmin: false,
        });
        await user.save();
      }

      done(null, user);  
    } catch (error) {
      done(error, false);
    }
  }
));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);  
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;




