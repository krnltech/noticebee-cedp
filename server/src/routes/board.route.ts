import { Router } from "express";
import { getBoard } from "../controllers/board.controller";
const r = Router();

r.get("/fetch/:boardId", getBoard);

export default r;
