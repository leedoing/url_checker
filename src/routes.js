// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const VERIFY = "/verify";

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
const URLS = "/urls";
const URL = "/:url";
const CHECK_URL = "/:url/check";
const ADD_URL = "/:url/add";
const DEL_URL = "/:url/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  verify: VERIFY,
  users: USERS,
  userDetail: USER_DETAIL,
  purchase: PURCHASE,
  changePassword: CHANGE_PASSWORD,
  api: API,
  charts_get: CHARTS_GET,
  urls: URLS,
  url: URL,
  check_url: CHECK_URL,
  add_url: ADD_URL,
  del_url: DEL_URL
};

export default routes;
