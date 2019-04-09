import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/User";
import bkfd2Password from "pbkdf2-password";

const hasher = bkfd2Password();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
      passReqToCallback: true
    },
    (req, id, password, done) => {
      User.get({ email: id }, (findError, user) => {
        if (findError) return done(findError);
        if (!user) return done(null, false, { message: "Not found account" });
        hasher(
          { password: password, salt: user.salt },
          (err, pass, salt, hash) => {
            if (hash === user.passwd) {
              return done(null, user);
            }
            return done(null, false, { message: "Incorrect password" });
          }
        );
      });
    }
  )
);
