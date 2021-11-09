import { Router } from "express";
import {
  appendUpload,
  finishUpload,
  singleUpload,
  startUpload,
  getAllAssets,
} from "../controllers/upload.controllers";
const r = Router();

r.post("/start", startUpload);
r.post("/append", appendUpload);
r.post("/finish", finishUpload);
r.post("/singleupload", singleUpload);
r.get("/all/:adminId", getAllAssets);

export default r;
