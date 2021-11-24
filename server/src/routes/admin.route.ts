import { Router } from "express";
const r = Router();
import {
  addNoticeset,
  editNoticeset,
  getBoards,
  getBoard,
  getNoticeset,
  getNoticesets,
  loginAdmin,
  setBoardlayout,
  setBoardHeadline,
} from "../controllers/admin.controllers";

r.post("/login", loginAdmin);
r.get("/boards/:adminId", getBoards);
r.get("/board/:boardId", getBoard);
r.get("/board/set/headline/:boardId", setBoardHeadline);
r.get("/board/set/layout/:boardId", setBoardlayout);
r.get("/noticesets/:adminId", getNoticesets);
r.get("/noticeset/:noticesetId", getNoticeset);
r.post("/noticeset/add", addNoticeset);
r.post("/noticeset/edit/:noticesetId", editNoticeset);

export default r;
