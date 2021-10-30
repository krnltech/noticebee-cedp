import { Router } from "express";
import {
  appendUpload,
  finishUpload,
  singleUpload,
  startUpload,
} from "../controllers/upload.controllers";
const r = Router();

r.post("/start", startUpload);
r.post("/append", appendUpload);
r.post("/finish", finishUpload);
r.post("/singleupload", singleUpload);

export default r;
