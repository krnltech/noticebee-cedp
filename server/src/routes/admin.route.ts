import { Router } from "express";
const r = Router();
import { getBoards, loginAdmin } from "../controllers/admin.controllers";

r.post("/login", loginAdmin);
r.get("/boards/:adminId", getBoards);
r.get("/getBoard/:boardId");
export default r;
