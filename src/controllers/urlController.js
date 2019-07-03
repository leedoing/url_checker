import moment from "moment";
import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";
import request from "request-promise";

export const home = async (req, res) => {
  let userMeta;
  try {
    if (!req.user || req.user.email === process.env.mail) {
      userMeta = await User.get(process.env.mail);
      res.render("home", {
        pageTitle: "Home",
        email: userMeta.email,
        urls: userMeta.urls,
        purchase: userMeta.purchase
      });
    } else {
      const {
        user: { email }
      } = req;
      userMeta = await User.get(email);
      res.render("home", {
        pageTitle: "Home",
        email: userMeta.email,
        urls: userMeta.urls,
        purchase: userMeta.purchase
      });
    }
  } catch (err) {
    console.log(err);
    res.render("home", { pargeTitle: "Home" });
  }
};

export const checkUrl = async (req, res) => {
  const name = decodeURIComponent(req.url.split("/")[1]);
  const url = decodeURIComponent(req.url.split("/")[2]);
  let statusCode;
  let fileSize;
  try {
    await request.head(url).on("response", response => {
      statusCode = response.statusCode;
      fileSize = response.headers["content-length"] / 1024.0 / 1024.0;
    });
    if (statusCode != 200) {
      res.send(`Please check URL(HTTP(S) Status: ${statusCode})`);
    } else if (isNaN(fileSize)) {
      res.send(`Can't get a content-length header. Please check URL!`);
    } else if (fileSize > 10) {
      res.send(
        `You uploaded more than 10MB of files(${fileSize.toFixed(1)} MB)`
      );
    } else {
      const email = req.user.email;
      const purchase = req.user.purchase;
      const deadLine = moment()
        .utc()
        .add(1, "month")
        .format("YYYY-MM-DDTHH:mm:ss");
      if (purchase > 0) {
        User.update(
          { email },
          {
            $PUT: {
              purchase: purchase - 1
            },
            $ADD: {
              urls: [
                {
                  deadLine: deadLine,
                  name: name,
                  url: url
                }
              ]
            }
          },
          function(err) {
            if (err) {
              console.log(err);
            }
            res.send({
              result: true,
              comment: `Complited. You can check after 5min! (DeadLine: ${deadLine})`
            });
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.send(`Please check URL[HTTP(S) Status: ${statusCode}]`);
  }
};

export const delUrl = async (req, res) => {
  const {
    params: { name, url }
  } = req;
  let urls;
  console.log(name, url);
  User.get({ email: name }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.urls) {
        for (let i = 0; i < data.urls.length; i++) {
          if (data.urls[i].url == url) {
            console.log("???");
            data.urls.splice(i, 1);
          }
        }
        urls = data.urls;
        User.update(
          { email: name },
          {
            $PUT: {
              urls: urls
            }
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
      } else {
        console.log("Not Found URL");
      }
    }
  });
  res.end();
};
