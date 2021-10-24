import { Router } from "express";
import { getBoards, loginAdmin } from "../controllers/admin.controllers";
const r = Router();

r.post("/login", loginAdmin);
r.get("/boards/:adminId", getBoards);
r.get("/getBoard/:boardId");
export default r;
