import { url } from "inspector";

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

// URLs
const URLS = "/urls";
const URL = "/:id";
const ADD_URL = "/add";
const DEL_URL = "/:id/delete";

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
  urls: URLS,
  url: URL,
  add_url: ADD_URL,
  del_url: DEL_URL
};

export default routes;
