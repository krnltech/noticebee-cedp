import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ContentLibrary = lazy(() => import("../pages/ContentLibrary"));
const Boards = lazy(() => import("../pages/Boards"));
const Login = lazy(() => import("../pages/Login"));
const NoticeSet = lazy(() => import("../pages/NoticeSet"));
const EditNoticeSet = lazy(() => import("../pages/EditNoticeSet"));
const EditNoticeBoard = lazy(() => import("../pages/EditNoticeBoard"));

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
