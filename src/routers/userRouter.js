import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getProfile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.profile, onlyPrivate, getProfile);

export default userRouter;
