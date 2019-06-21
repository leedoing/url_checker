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
const USER_DETAIL = "/:id";
const PURCHASE = "/purchase";
const CHANGE_PASSWORD = "/change-password";

// API
const API = "/api";

// API CHARTS
const CHARTS_GET = "/charts/:id/:url/view/:hour";

// API URLS
const ADD_URL = "/:name/:url/add";
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
  userDetail: USER_DETAIL,
  purchase: PURCHASE,
  changePassword: CHANGE_PASSWORD,
  api: API,
  charts_get: CHARTS_GET,
  add_url: ADD_URL,
  del_url: DEL_URL
};

export default routes;
