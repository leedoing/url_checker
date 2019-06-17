import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getChart } from "../controllers/chartController";
import { checkUrl } from "../controllers/urlController";

const apiRouter = express.Router();

apiRouter.get(routes.charts_get, getChart);
apiRouter.get(routes.add_url, onlyPrivate, checkUrl);
// apiRouter.get(routes.add_url, onlyPrivate, addUrl);

export default apiRouter;
