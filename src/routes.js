// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const FIND = "/find";
const LOGOUT = "/logout";
const SEARCH = "/search";
const VERIFY = "/verify";
const CHANGE = "/change";

// Users
const USERS = "/users";
const PROFILE = "/profile";
const CHANGE_PASSWORD = "/change-password";
const WITHDRAWAL = "/withdrawal";
const PAYMENT = "/payment";
const PURCHASE = "/payment/:coin";

// API
const API = "/api";

// API CHARTS
const CHARTS_GET = "/charts/:id/:url/view/:hour";

// API URLS
const ADD_URL = "/:name/:url/:month/add";
const DEL_URL = "/:name/:url/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  find: FIND,
  logout: LOGOUT,
  search: SEARCH,
  verify: VERIFY,
  change: CHANGE,
  users: USERS,
  profile: PROFILE,
  changePassword: CHANGE_PASSWORD,
  withdrawal: WITHDRAWAL,
  payment: PAYMENT,
  purchase: PURCHASE,
  api: API,
  charts_get: CHARTS_GET,
  add_url: ADD_URL,
  del_url: DEL_URL
};

export default routes;
