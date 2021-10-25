import Dashboard from "../pages/Dashboard";
import ContentLibrary from "../pages/ContentLibrary";
import Boards from "../pages/Boards";

export default [
  { name: "Dashboard", component: Dashboard, path: "/", navbar: true },
  { name: "Boards", component: Boards, path: "/boards", navbar: true },
  {
    name: "NoticeSets",
    component: Dashboard,
    path: "/noticeSets",
    navbar: true,
  },
  {
    name: "Content Library",
    component: ContentLibrary,
    path: "/content-library",
    navbar: true,
  },
  {
    name: "Content Librarys",
    component: Dashboard,
    path: "/content-library",
    navbar: false,
  },
];
