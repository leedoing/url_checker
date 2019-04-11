import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import urlRouter from "./routers/urlRouter";
import apiRouter from "./routers/apiRouter";
import passport from "passport";
import "./passport";
import connectDynamodb from "connect-dynamodb";

const app = express();
const dynamodbStore = connectDynamodb({ session });
const options = {
  table: "url_checker_session",
  AWSConfigJSON: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: "ap-northeast-2"
  },
  readCapacityUnits: 5,
  writeCapacityUnits: 1
};

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new dynamodbStore(options)
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.api, apiRouter);
app.use(routes.urls, urlRouter);

export default app;
