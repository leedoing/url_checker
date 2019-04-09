import express from "express";
import routes from "../routes";
import { home } from "../controller/urlController";
import {
  getJogin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getVerify
} from "../controller/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJogin);
globalRouter.post(routes.join, onlyPublic, postJoin);
globalRouter.get(routes.verify, onlyPublic, getVerify);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
