import { Request, Response } from "express";
import fs from "fs";
export const startUpload = (req: Request, res: Response) => {
  try {
    req.on("data", async (chunk) => {
      let name = req.headers["x-values"];
      let filename = req.headers["x-filename"];
      fs.appendFileSync("uploads/" + filename, chunk);
      res.json({ message: "ok" });
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const appendUpload = (req: Request, res: Response) => {
  try {
    req.on("data", async (chunk) => {
      let name = req.headers["x-values"];
      let filename = req.headers["x-filename"];
      fs.appendFileSync("uploads/" + filename, chunk);
      res.json({ message: "ok" });
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const finishUpload = (req: Request, res: Response) => {
  try {
    req.on("data", async (chunk) => {
      let name = req.headers["x-values"];
      let filename = req.headers["x-filename"];
      fs.appendFileSync("uploads/" + filename, chunk);
      res.json({ message: "ok" });
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const singleUpload = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
