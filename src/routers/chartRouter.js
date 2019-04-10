import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getHomeChart } from "../controllers/chartController";

const chartRouter = express.Router();

chartRouter.get(routes.charts_home, getHomeChart);

export default chartRouter;
