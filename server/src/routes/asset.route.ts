import { Router } from "express";
import {
  appendUpload,
  finishUpload,
  singleUpload,
  getAllAssets,
  textUpload,
  externalUpload,
} from "../controllers/upload.controllers";
const r = Router();

r.post("/append", appendUpload);
r.post("/finish", finishUpload);
r.post("/singleupload", singleUpload);
r.post("/text/upload", textUpload);
r.post("/external/upload", externalUpload);
r.get("/all/:adminId", getAllAssets);
export default r;
