import Dashboard from "../pages/Dashboard";
import ContentLibrary from "../pages/ContentLibrary";
import Boards from "../pages/Boards";
import Login from "../pages/Login";
import NoticeSet from "../pages/NoticeSet";
import EditNoticeSet from "../pages/EditNoticeSet";
import EditNoticeBoard from "../pages/EditNoticeBoard";

export default [
  // {
  //   name: "Dashboard",
  //   component: Dashboard,
  //   path: "/",
  //   navbar: true,
  //   private: true,
  // },
  {
    name: "Boards",
    component: Boards,
    path: "/",
    navbar: true,
    private: true,
  },
  {
    name: "Edit Noticeboards",
    component: EditNoticeBoard,
    path: "/noticeboard/edit/:noticeBoardId",
    navbar: false,
    private: true,
  },
  {
    name: "Noticesets",
    component: NoticeSet,
    path: "/noticesets",
    navbar: true,
    private: true,
  },
  {
    name: "Edit Noticesets",
    component: EditNoticeSet,
    path: "/noticeset/edit/:noticeSetId",
    navbar: false,
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
