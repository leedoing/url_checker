import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getChangePassword } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);

export default userRouter;
