import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";

export const home = async (req, res) => {
  let userMeta;
  try {
    if (!req.user) {
      userMeta = await User.get("lluckyy77@gmail.com");
    } else {
      userMeta = await User.get(req.user.email);
    }
    console.log(userMeta);
  } catch (err) {
    console.log(err);
  }
  res.render("home", { pageTitle: "Home" });
};
