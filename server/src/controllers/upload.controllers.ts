import { Request, Response } from "express";
import fs from "fs";
const { exec } = require("child_process");
import AssetModel from "../models/asset.model";
import OrganizationModel from "../models/organization.model";

export const startUpload = (req: Request, res: Response) => {
  console.log("start");

  // try {
  //   req.on("data", async (chunk) => {
  //     let name = req.headers["x-values"];
  //     let filename = req.headers["x-filename"] || " ";
  //     fs.appendFileSync("src/uploads/" + filename.toString(), chunk);
  //     res.json({ message: "ok" });
  //   });
  // } catch (error: any) {
  //   console.log(error);
  //   res.json({ message: error.message });
  // }
  console.log(req.body);
  req.on("data", async (chunk) => {
    let filename = req.headers["x-filename"] || " ";
    fs.appendFileSync("src/uploads/" + filename.toString(), chunk);
  });
  req.on("end", () => {
    res.json({ message: "ok" });
  });
  req.on("error", function (error: any) {
    res.status(500).json({ message: error.message });
  });
};

export const appendUpload = (req: Request, res: Response) => {
  console.log("append");

  // try {
  //   req.on("data", async (chunk) => {
  //     let name = req.headers["x-values"];
  //     let filename = req.headers["x-filename"] || " ";
  //     fs.appendFileSync("src/uploads/" + filename.toString(), chunk);
  //     res.json({ message: "ok" });
  //   });
  // } catch (error: any) {
  //   console.log(error);
  //   res.json({ message: error.message });
  // }
  req.on("data", async (chunk) => {
    let filename = req.headers["x-filename"] || " ";
    fs.appendFileSync("src/uploads/" + filename.toString(), chunk);
  });
  req.on("end", () => {
    res.json({ message: "ok" });
  });
  req.on("error", function (error: any) {
    res.status(500).json({ message: error.message });
  });
};

export const finishUpload = (req: Request, res: Response) => {
  // try {
  //   req.on("data", async (chunk) => {
  //     let name = req.headers["x-values"];
  //     let filename = req.headers["x-filename"] || " ";
  //     fs.appendFileSync("src/uploads/" + filename.toString(), chunk);
  //     res.json({ message: "ok" });
  //   });
  // } catch (error: any) {
  //   console.log(error);
  //   res.json({ message: error.message });
  // }
  console.log("finish");
  req.on("data", async (chunk) => {
    let name = req.headers["x-name"];
    let filename = req.headers["x-filename"];
    let orgId = req.headers["x-orgid"];
    let adminId = req.headers["x-adminid"];
    console.log(orgId, adminId);
    fs.appendFileSync("src/uploads/" + filename, chunk);
    const org = await OrganizationModel.findOne({ _id: orgId });
    if (org) {
      const orgName = org.name.replace(/ /g, "");
      let filepath = `kernel/noticebee/${orgName}/materials`;
      exec(
        `s3cmd put src/uploads/${filename} s3://kernel/${filepath}/ -P`,
        async (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.error(err);
            // res.status(500).json({ success: false, message: err.message });
          } else if (stderr) {
            console.error(stderr);
            // res
            //   .status(500)
            //   .json({ success: false, message: stderr.toString() });
          } else {
            console.log(`stdout: ${stdout}`);
            const content = new AssetModel({
              name: name,
              type: "any",
              url: `https://kernel.ap-south-1.linodeobjects.com/${filepath}/${filename}`,
              admin: adminId,
              organization: orgId,
            });
            const a = await content.save();
            if (a) {
              exec(`rm src/uploads/${filename}`);
            }
            // values.material = `https://kernel.ap-south-1.linodeobjects.com/${filepath}/${values.filename}`;
            // const material = new Material(values);
            // await material.save();
          }
        }
      );
    }
  });
  req.on("end", () => {
    res.json({
      success: true,
      message: "Successfully uploaded material",
    });
  });
  req.on("error", function (error: any) {
    res.status(500).json({ message: error.message });
  });
};

export const singleUpload = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getAllAssets = async (req: Request, res: Response) => {
  try {
    const assets = await AssetModel.find({ admin: req.params.adminId }).select(
      "-__v"
    );
    res.json({ assets });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
