import { Router } from "express";
const r = Router();
import {
  addNoticeset,
  editNoticeset,
  getBoards,
  getNoticeset,
  getNoticesets,
  loginAdmin,
} from "../controllers/admin.controllers";

r.post("/login", loginAdmin);
r.get("/boards/:adminId", getBoards);
r.get("/getBoard/:boardId");
r.get("/getNoticesets/:organizationId", getNoticesets);
r.get("/getNoticeset/:noticesetId", getNoticeset);
r.get("/noticeset/add/:noticesetId", addNoticeset);
r.get("/noticeset/edit/:noticesetId", editNoticeset);

export default r;
