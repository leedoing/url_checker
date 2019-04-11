import routes from "../routes";
import User from "../models/User";
import Url from "../models/Url";
const LOCATIONLIST = ["KR"];
const SECRET = "leedoing";

export const getChart = async (req, res) => {
  const url = req.url.split("/");
  const email = url[2];
  const hashList = [];
  const resultList = [];
  try {
    const userMeta = await User.get(email);
    LOCATIONLIST.forEach(location => {
      userMeta.urls.forEach(urls => {
        const hash = Buffer.from(SECRET + email + urls.url + location).toString("base64");
        hashList.push(hash);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
// loggedUser.email
