import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import {
  getChangePassword,
  getWithdrawal,
  getPayment,
  postPayment
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.get(routes.withdrawal, onlyPrivate, getWithdrawal);
userRouter.get(routes.payment, onlyPrivate, getPayment);
userRouter.post(routes.purchase, onlyPrivate, postPayment);

export default userRouter;
