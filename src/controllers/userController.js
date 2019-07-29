// import dotenv from "dotenv";
import User from "../models/User";
import routes from "../routes";
import bkfd2Password from "pbkdf2-password";
import nodemailer from "nodemailer";
import passport from "passport";
import Stripe from "stripe";

// dotenv.config();

const hasher = bkfd2Password();
const stripeSecret = process.env.PAYMENT_SK;
const stripe = new Stripe(stripeSecret);
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PW
  }
});
let TODAY = new Date().getDate();
let RAND = Buffer.from(process.env.SECRET + TODAY).toString("base64");
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
  // RAND = Math.floor(Math.random() * 100 + 54);
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
      "Please Click on the link to verify your email.<br>" +
      "If you choose not to approve this request, you do not need to do anything.<br>" +
      "<a href=" +
      link +
      ">Click here to verify</a>"
  };
  smtpTransport.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err);
      res.end("err");
    } else {
      res.end("sent email");
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
            // RAND = Math.floor(Math.random() * 100 + 54);
            EMAIL = email;
            PASSWD = password;
            const host = req.get("host");
            const link =
              "http://" + req.get("host") + "/verify?name=join&id=" + RAND;
            const mailOptions = {
              to: email,
              subject: "[URL CHECKER🚦] Please confirm your Email account",
              html:
                "Please Click on the link to verify your email. <br>" +
                "You can use 30 DAY FREE TRIAL<br>" +
                "If you choose not to approve this request, you do not need to do anything.<br>" +
                "<a href=" +
                link +
                ">Click here to verify</a>"
            };
            smtpTransport.sendMail(mailOptions, function(err, response) {
              if (err) {
                console.log(err);
                res.end("err");
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
        salt: salt,
        purchase: 1
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

export const getChangePassword = (req, res) => {
  const {
    user: { email, purchase }
  } = req;
  res.render("change", { pageTitle: "Change", email, purchase });
};

export const getWithdrawal = (req, res) => {
  res.render("withdrawal", {
    pageTitle: "Withdrawal"
  });
};

export const getPayment = async (req, res) => {
  const {
    user: { email }
  } = req;
  const userMeta = await User.get(email);
  res.render("payment", {
    pageTitle: "Payment",
    purchase: userMeta.purchase
  });
};

export const postPayment = async (req, res) => {
  const coin = req.url.split("/")[2];
  let amount;
  if (coin == 1) {
    amount = 1000;
  } else if (coin == 6) {
    amount = 5000;
  } else {
    amount = 10000;
  }
  const {
    body: { stripeEmail, stripeToken },
    user: { email }
  } = req;
  try {
    const customer = await stripe.customers.create({
      email: stripeEmail,
      source: stripeToken
    });
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      description: "URL-CHECKER 1 coin"
    });
    await stripe.invoiceItems.create({
      amount: amount,
      currency: "usd",
      customer: charge.customer,
      description: "URL-CHECKER 1 coin"
    });
    const invoice = await stripe.invoices.create({
      customer: charge.customer,
      collection_method: "send_invoice",
      days_until_due: 30
    });
    await stripe.invoices.sendInvoice(invoice.id, function(err, invoice) {
      const mailOptions = {
        to: email,
        subject: "[URL CHECKER🚦] Please check invoce",
        html:
          "Please Click on the link to invoice.<br><a href=" +
          invoice.hosted_invoice_url +
          ">Click her to invoce</a>"
      };
      smtpTransport.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("sent email");
        }
      });
    });
    if (charge.status == "succeeded") {
      await User.update(
        {
          email
        },
        {
          $ADD: {
            purchase: +coin
          }
        }
      );
      const userMeta = await User.get(email);
      res.render("payment", {
        pageTitle: "Payment",
        message:
          "Thank you for your purchase. " +
          "The invoice was sent to your email. Please check ",
        purchase: userMeta.purchase,
        receipt: `${charge.receipt_url}`
      });
    } else {
      const userMeta = await User.get(email);
      res.render("payment", {
        pageTitle: "Payment",
        message: "Failed to charge",
        purchase: userMeta.purchase
      });
    }
  } catch (err) {
    console.log(err);
    const userMeta = await User.get(email);
    res.render("payment", {
      pageTitle: "Payment",
      message: "Failed to charge",
      purchase: userMeta.purchase
    });
  }
};
