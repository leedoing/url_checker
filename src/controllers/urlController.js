import routes from "../routes";
import Url from "../models/Url";
import User from "../models/User";

export const home = async (req, res) => {
  let userMeta;
  console.log(process.env.mail);
  console.log(req.user.email);
  try {
    if (!req.user || req.user.email === process.env.mail) {
      userMeta = await User.get(process.env.mail);
    } else {
      const {
        user: { user }
      } = req;
      userMeta = user;
    }
    console.log(userMeta);
    res.render("home", { pargeTitle: "Home" });
  } catch (err) {
    console.log(err);
    res.render("home", { pargeTitle: "Home" });
  }
  console.log("test");
  //   try {
  //     if (!req.user) {
  //       userMeta = await User.get("lluckyy77@gmail.com");
  //     } else {
  //       userMeta = await User.get(req.user.email);
  //     }
  //     console.log(userMeta);
  //   } catch (err) {
  //     console.log(err);
  //     res.render("home", { pageTitle: "Home", urls})
  //   }
};
