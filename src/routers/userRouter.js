import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import {
  getChangePassword,
  getWithdrawal
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.get(routes.withdrawal, onlyPrivate, getWithdrawal);

export default userRouter;
