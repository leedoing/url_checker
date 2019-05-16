import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";

export const home = async (req, res) => {
  let userMeta;
  try {
    if (!req.user || req.user.email === process.env.mail) {
      userMeta = await User.get(process.env.mail);
      res.render("home", { pargeTitle: "Home", urls: userMeta.urls });
    } else {
      const {
        user: { email }
      } = req;
      userMeta = await User.get(email);
      res.render("home", { pargeTitle: "Home", urls: userMeta.urls });
    }
  } catch (err) {
    console.log(err);
    res.render("home", { pargeTitle: "Home" });
  }
};
