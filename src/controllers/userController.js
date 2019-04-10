import User from "../models/User";
import routes from "../routes";
import bkfd2Password from "pbkdf2-password";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import passport from "passport";

dotenv.config();
const hasher = bkfd2Password();

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "lluckyy77",
    pass: "tjdrhd1324"
  }
});
var RAND = 0;
var PASSWD = "global";
var EMAIL = "global";

export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2 }
  } = req;
  try {
    await User.get({ email: email }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (!data) {
          if (password === password2) {
            RAND = Math.floor(Math.random() * 100 + 54);
            EMAIL = email;
            PASSWD = password;
            const host = req.get("host");
            const link = "http://" + req.get("host") + "/verify?id=" + RAND;
            const mailOptions = {
              to: "lluckyy@gscdn.com",
              subject: "[URL CHECKER🚦] Please confirm your Email account",
              html:
                "Please Click on the link to verify your email.<br><a href=" +
                link +
                ">Click here to verify</a>"
            };
            smtpTransport.sendMail(mailOptions, function(error, response) {
              if (error) {
                console.log(error);
                res.end("error");
              } else {
                res.end("sent");
              }
            });
            res.status(200);
            res.render("join", {
              pageTitle: "Join",
              message: "Send a Message, Check your email"
            });
          } else {
            res.status(400);
            res.render("join", {
              pageTitle: "Join",
              message: "Passwords don't match"
            });
          }
        } else {
          res.status(400);
          res.render("join", {
            pageTitle: "Join",
            message: "This email has already been subscribed"
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getVerify = async (req, res) => {
  const {
    query: { id }
  } = req;
  if (id == RAND) {
    await hasher({ password: PASSWD }, (err, pass, salt, hash) => {
      const user = {
        email: EMAIL,
        passwd: hash,
        salt: salt
      };
      try {
        User.create(user, (err, odie) => {
          if (err) {
            return console.log(err);
          }
          res.status(302);
          res.render("login", { pageTitle: "login" });
        });
      } catch (err) {
        res.status(400);
        res.render("join", {
          pageTitle: "join",
          message: "Expired authentication token"
        });
      }
    });
  } else {
    res.status(400);
    res.render("join", {
      pageTitle: "join",
      message: "Expired authentication token"
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
