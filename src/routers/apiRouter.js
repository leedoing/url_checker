import express from "express";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";
import { getChart } from "../controllers/chartController";
import { postCheckUrl, postDelUrl } from "../controllers/urlController";

const apiRouter = express.Router();

apiRouter.get(routes.charts_get, getChart);
apiRouter.post(routes.del_url, onlyPrivate, postDelUrl);
apiRouter.post(routes.add_url, onlyPrivate, postCheckUrl);

export default apiRouter;
