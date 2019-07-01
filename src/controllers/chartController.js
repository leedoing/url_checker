import moment from "moment";
import routes from "../routes";
import User from "../models/User";
import Url from "../models/Url";
const LOCATIONLIST = ["KR", "US", "DE"];

export const getChart = async (req, res) => {
  let email;
  let hours;
  const uri = req.url.split("/");
  if (!req.user) {
    email = process.env.mail;
    hours = 36;
  } else if (req.user.email != uri[2]) {
    email = process.env.mail;
    hours = 36;
  } else {
    email = uri[2];
    hours = uri[5];
  }
  const delay = Number(hours) + 9;
  const hour = moment()
    .subtract(delay, "hours")
    .format()
    .split("+")[0];
  const url = decodeURIComponent(uri[3]);
  const hashList = [];
  const resultList = [];
  try {
    // let userMeta = await User.get(email);
    LOCATIONLIST.forEach(location => {
      const hash = Buffer.from(
        process.env.secret + email + url + location
      ).toString("base64");
      hashList.push(hash);
    });

    // LOCATIONLIST.forEach(location => {
    //   userMeta.urls.forEach(urls => {
    //     const hash = Buffer.from(
    //       process.env.secret + email + urls.url + location
    //     ).toString("base64");
    //     hashList.push(hash);
    //   });
    // });
  } catch (err) {
    console.log(err);
  }

  const getData = hash => {
    return new Promise((resolve, reject) => {
      Url.query("id")
        .eq(hash)
        .where("date")
        .ge(hour)
        .exec((err, url) => {
          if (err) {
            reject({ err: err });
          } else {
            resolve(url);
          }
        });
    });
  };

  const initGetData = async () => {
    try {
      for (let i = 0; i < hashList.length; i++) {
        const result = await getData(hashList[i]);
        if (!result.length == 0) {
          await resultList.push(result);
        }
      }
      res.send(resultList);
    } catch (err) {
      res.send("FucK");
      res.status(403);
    } finally {
      res.end();
    }
  };

  initGetData();
};
