import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getChart } from "../controllers/chartController";

const apiRouter = express.Router();

apiRouter.get(routes.charts_get, getChart);

export default apiRouter;
