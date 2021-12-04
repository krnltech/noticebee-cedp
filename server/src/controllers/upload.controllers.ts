import { Request, Response } from "express";
import fs from "fs";
const { exec } = require("child_process");
import AssetModel from "../models/asset.model";
import OrganizationModel from "../models/organization.model";
import TagModel from "../models/tag.model";
import s3 from "../utils/s3-uploader";

export const appendUpload = (req: Request, res: Response) => {
  // console.log("append");
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

export const finishUpload = async (req: Request, res: Response) => {
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
  try {
    const { name, fileName, orgId, adminId, fileType, tags } = req.body;
    const allTags = await TagModel.find();
    const newTags = tags.filter(
      (tag: string) => !allTags.some((t) => t.name === tag)
    );
    // console.log(newTags);
    newTags.map(async (t: string) => {
      const nTag = new TagModel({ name: t });
      await nTag.save();
    });
    const org = await OrganizationModel.findOne({ _id: orgId });
    if (org) {
      const orgName = org.name.replace(/ /g, "");
      let filepath = `kernel/noticebee-cedp/${orgName}/materials`;
      const file = fs.readFileSync("src/uploads/" + fileName);
      const uploadParams = {
        Bucket: "kernel",
        Key: filepath + "/" + fileName,
        Body: fs.readFileSync("src/uploads/" + fileName),
        ACL: "public-read",
      };

      s3.upload(uploadParams, async function (err: any, data: any) {
        if (err) {
          console.log("Error", err);
          throw Error(err.message);
        }
        if (data) {
          const content = new AssetModel({
            name: name,
            type: fileType,
            content: data.Location,
            admin: adminId,
            organization: orgId,
            tags: tags,
            source: "media",
          });
          const a = await content.save();
          console.log("Upload Success", data);
          if (a) {
            exec(`rm src/uploads/${fileName}`);
            res.json({
              success: true,
              message: "Successfully uploaded material",
            });
          }
        }
      });
      // exec(
      //   `s3cmd put src/uploads/${filename} s3://kernel/${filepath}/ -P`,
      //   async (err: any, stdout: any, stderr: any) => {
      //     if (err) {
      //       console.error(err);
      //       // res.status(500).json({ success: false, message: err.message });
      //     } else if (stderr) {
      //       console.error(stderr);
      //       // res
      //       //   .status(500)
      //       //   .json({ success: false, message: stderr.toString() });
      //     } else {
      //       console.log(`stdout: ${stdout}`);
      //       const content = new AssetModel({
      //         name: name,
      //         type: "any",
      //         url: `https://kernel.ap-south-1.linodeobjects.com/${filepath}/${filename}`,
      //         admin: adminId,
      //         organization: orgId,
      //       });
      //       const a = await content.save();
      //       if (a) {
      //         exec(`rm src/uploads/${filename}`);
      //       }
      //       // values.material = `https://kernel.ap-south-1.linodeobjects.com/${filepath}/${values.filename}`;
      //       // const material = new Material(values);
      //       // await material.save();
      //     }
      //   }
      // );
    } else {
      throw Error("org not found");
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
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
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const textUpload = async (req: Request, res: Response) => {
  try {
    const asset = new AssetModel(req.body);
    await asset.save();
    res.json({
      success: true,
      message: "Successfully uploaded text asset",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
