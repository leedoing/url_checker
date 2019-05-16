import moment from "moment";
import routes from "../routes";
import User from "../models/User";
import Url from "../models/Url";
const LOCATIONLIST = ["KR", "US"];

export const getChart = async (req, res) => {
  const url = req.url.split("/");
  const email = url[2];
  const hours = url[4];
  const delay = Number(hours) + 9;
  const hour = moment()
    .subtract(delay, "hours")
    .format()
    .split("+")[0];
  const hashList = [];
  const resultList = [];
  try {
    let userMeta = await User.get(email);
    if (!userMeta.urls) {
      userMeta = await User.get("lluckyy77@gmail.com");
    }
    LOCATIONLIST.forEach(location => {
      // userMeta.urls.forEach(urls => {
      //   const hash = Buffer.from(
      //     process.env.secret + email + urls.url + location
      //   ).toString("base64");
      //   hashList.push(hash);
      // });

      const hash = Buffer.from(
        process.env.secret + email + userMeta.urls[0].url + location
      ).toString("base64");
      hashList.push(hash);
    });
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
        await resultList.push(result);
      }
      res.send(resultList);
    } catch (err) {
      res.send(err);
    }
  };

  initGetData();
};
// loggedUser.email
