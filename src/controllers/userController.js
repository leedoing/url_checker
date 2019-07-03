// import dotenv from "dotenv";
import User from "../models/User";
import routes from "../routes";
import bkfd2Password from "pbkdf2-password";
import nodemailer from "nodemailer";
import passport from "passport";

// dotenv.config();

const hasher = bkfd2Password();
const smtpTransport = nodemailer.createTransport({
  service: process.env.mail,
  auth: {
    user: process.env.mail_id,
    pass: process.env.mail_pw
  }
});
let RAND;
let PASSWD;
let EMAIL;

export const postChangePassword = async (req, res) => {
  const {
    body: { email, password, password2 }
  } = req;
  if (password === password2) {
    await hasher({ password: password }, (err, pass, salt, hash) => {
      const user = {
        passwd: hash,
        salt: salt
      };
      try {
        User.update(
          { email },
          {
            $PUT: {
              passwd: user.passwd,
              salt: user.salt
            }
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
        res.status(200);
        res.render("change", {
          pageTitle: "Change",
          message: "Complited change password"
        });
      } catch (err) {
        res.send(err);
      }
    });
  } else {
    res.status(400);
    res.render("change", {
      pageTitle: "Change",
      message: "Password doesn't match"
    });
  }
};

export const getFindPassword = (req, res) => {
  res.render("find", { pageTitle: "Find" });
};

export const postFindPassword = (req, res) => {
  const {
    body: { email }
  } = req;
  RAND = Math.floor(Math.random() * 100 + 54);
  EMAIL = email;
  const link =
    "http://" +
    req.get("host") +
    "/verify?name=change&id=" +
    RAND +
    "&email=" +
    EMAIL;
  const mailOptions = {
    to: email,
    subject: "[URL CHECKER🚦] Please confirm your password change",
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
  res.render("find", {
    pageTitle: "Find",
    message: "Send a Message, Check your email"
  });
};

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
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
            const link =
              "http://" + req.get("host") + "/verify?name=join&id=" + RAND;
            const mailOptions = {
              to: email,
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
              message: "Password doesn't match"
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
    query: { id, name, email }
  } = req;
  if (id == RAND && name == "join") {
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
          res.render("login", { pageTitle: "Login" });
        });
      } catch (err) {
        res.status(400);
        res.render("join", {
          pageTitle: "Join",
          message: "Expired authentication token"
        });
      }
    });
  } else if (id == RAND && name == "change") {
    res.render("change", {
      pageTitle: "Change",
      email: email
    });
  } else {
    res.status(400);
    res.render("join", {
      pageTitle: "Join",
      message: "Expired authentication token"
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getProfile = (req, res) => {
  res.render("profile", { pageTitle: "Profile" });
};
