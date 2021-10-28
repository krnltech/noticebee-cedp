import Dashboard from "../pages/Dashboard";
import ContentLibrary from "../pages/ContentLibrary";
import Boards from "../pages/Boards";
import Login from "../pages/Login";

export default [
  {
    name: "Dashboard",
    component: Dashboard,
    path: "/",
    navbar: true,
    private: true,
  },
  {
    name: "Boards",
    component: Boards,
    path: "/boards",
    navbar: true,
    private: true,
  },
  {
    name: "NoticeSets",
    component: Dashboard,
    path: "/noticeSets",
    navbar: true,
    private: true,
  },
  {
    name: "Content Library",
    component: ContentLibrary,
    path: "/content-library",
    navbar: true,
    private: true,
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
    navbar: true,
    private: false,
  },
];
