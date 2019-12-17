import express from "express";
import routes from "../routes";
import { home } from "../controllers/urlController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getVerify,
  getFindPassword,
  postFindPassword,
  postChangePassword
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin);
globalRouter.get(routes.verify, onlyPublic, getVerify);

globalRouter.get(routes.find, onlyPublic, getFindPassword);
globalRouter.post(routes.find, onlyPublic, postFindPassword);
globalRouter.post(routes.change, postChangePassword);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
