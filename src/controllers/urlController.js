import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";
import request from "request";

export const home = async (req, res) => {
  let userMeta;
  try {
    if (!req.user || req.user.email === process.env.mail) {
      userMeta = await User.get(process.env.mail);
      res.render("home", {
        pageTitle: "Home",
        email: userMeta.email,
        urls: userMeta.urls
      });
    } else {
      const {
        user: { email }
      } = req;
      userMeta = await User.get(email);
      res.render("home", {
        pageTitle: "Home",
        email: userMeta.email,
        urls: userMeta.urls
      });
    }
  } catch (err) {
    console.log(err);
    res.render("home", { pargeTitle: "Home" });
  }
};

export const checkUrl = async (req, res) => {
  const url = decodeURIComponent(req.url.split("/")[1]);
  try {
    request.head(url).on("response", response => {
      const fileSize = response.headers["content-length"] / 1024 / 1024;
      if (fileSize < 10) {
        res.send(`You uploaded more than 10MB of files(${fileSize} MB)`);
      }
      console.log(response.status);
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUrl = async (req, res) => {
  console.log("tt");
};
