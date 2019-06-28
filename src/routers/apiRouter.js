import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getChart } from "../controllers/chartController";
import { checkUrl, delUrl } from "../controllers/urlController";

const apiRouter = express.Router();

apiRouter.get(routes.charts_get, getChart);
apiRouter.post(routes.del_url, onlyPrivate, delUrl);
apiRouter.get(routes.add_url, onlyPrivate, checkUrl);

export default apiRouter;
