import { Router } from "express";
import {
  appendUpload,
  finishUpload,
  singleUpload,
  getAllAssets,
  textUpload,
} from "../controllers/upload.controllers";
const r = Router();

r.post("/append", appendUpload);
r.post("/finish", finishUpload);
r.post("/singleupload", singleUpload);
r.post("/text/upload", textUpload);
r.get("/all/:adminId", getAllAssets);
export default r;
