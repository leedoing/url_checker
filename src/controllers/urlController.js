import moment from "moment";
import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";
import request from "request-promise";

export const home = async (req, res) => {
  let userMeta;
  try {
    if (!req.user || req.user.email === process.env.MAIL_ID) {
      userMeta = await User.get(process.env.MAIL_ID);
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
      if (!userMeta.purchase) {
        userMeta.purchase = 0;
      }
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

export const postCheckUrl = async (req, res) => {
  const name = decodeURIComponent(req.url.split("/")[1]);
  const url = decodeURIComponent(req.url.split("/")[2]);
  const month = decodeURIComponent(req.url.split("/")[3]);
  let statusCode;
  let fileSize;
  let urls;
  const email = req.user.email;
  const deadLine = moment()
    .utc()
    .add(month, "month")
    .format("YYYY-MM-DDTHH:mm:ss");
  try {
    await request.head(url).on("response", response => {
      statusCode = response.statusCode;
      fileSize = response.headers["content-length"] / 1024.0 / 1024.0;
    });
    if (statusCode != 200) {
      res.send(`Please check URL(HTTP(S) Status: ${statusCode})`);
    } else if (isNaN(fileSize)) {
      res.send(`Can't get a content-length header. Please check URL!`);
    } else if (fileSize > 2) {
      res.send(
        `You uploaded more than 10MB of files(${fileSize.toFixed(1)} MB)`
      );
    } else {
      await User.get({ email: email }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data.purchase < month || !data.purchase || data.purchase < 1) {
            res.send("Sorry, Not enough coin. Please purchase coin");
          } else {
            if (!data.urls) {
              urls = [
                {
                  deadLine: deadLine,
                  name: name,
                  url: url
                }
              ];
            } else {
              urls = {
                deadLine: deadLine,
                name: name,
                url: url
              };
              data.urls.push(urls);
              urls = data.urls;
            }
            User.update(
              { email },
              {
                $PUT: {
                  purchase: data.purchase - month,
                  urls: urls
                }
              },
              function(err) {
                if (err) {
                  console.log(err);
                }
              }
            );
            res.send({
              result: true,
              comment: `Complited. You can check after 5min! (DeadLine: ${deadLine})`
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postDelUrl = async (req, res) => {
  const {
    params: { name, url }
  } = req;
  let urls;
  User.get({ email: name }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.urls) {
        for (let i = 0; i < data.urls.length; i++) {
          if (data.urls[i].url == url) {
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
      }
    }
  });
  res.end();
};
