import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.model";
import AssetModel from "../models/asset.model";
import BoardModel from "../models/board.model";
import NoticeSetModel from "../models/noticeset.model";
import OrganizationModel from "../models/organization.model";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findOne({ email: req.body.email }).select(
      "-boards -__v"
    );
    // console.log(req.body, admin);
    if (admin) {
      if (req.body.password === admin.password) {
        const accessToken = jwt.sign(
          {
            id: admin._id,
            email: admin.email,
            org: admin.organization,
            role: admin.role,
          },
          "magictoken",
          {
            expiresIn: "2h",
          }
        );
        res.json({
          accessToken: accessToken,
          message: "Successfully logged in!",
        });
      } else {
        res.status(500).json({
          message: "Wrong Password!",
        });
      }
    } else {
      res.status(500).json({
        message: "Admin with this email not found",
      });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBoards = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findOne({
      _id: req.params.adminId,
    }).populate({
      path: "boards",
      select: "_id name",
      model: BoardModel,
    });
    // .populate({
    //   path: "organization",
    //   select: "_id",
    //   model: OrganizationModel,
    // });
    if (admin?.role === "central") {
      const organization = await OrganizationModel.findOne({
        _id: admin.organization,
      })
        .select("-__v")
        .populate({
          path: "boards",
          select: "_id name",
          model: BoardModel,
        });
      // console.log(organization);
      res.json({ boards: organization?.boards });
    } else {
      res.json({ boards: admin?.boards || [] });
    }
    // console.log(admin);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNoticesets = async (req: Request, res: Response) => {
  try {
    const noticesets = await NoticeSetModel.find({
      admin: req.params.adminId,
    })
      .select("-__v")
      .populate({
        path: "assets",
        select: "-__v",
        model: AssetModel,
      });
    // .populate({ path: "admin", select: "-__v -password", model: AdminModel })
    // .populate({
    //   path: "organization",
    //   select: "-__v",
    //   model: OrganizationModel,
    // })
    res.json({ noticesets });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNoticeset = async (req: Request, res: Response) => {
  try {
    const noticeset = await NoticeSetModel.findOne({
      _id: req.params.noticesetId,
    })
      .select("-__v")
      // .populate({ path: "admin", select: "-__v -password", model: AdminModel })
      // .populate({
      //   path: "organization",
      //   select: "-__v",
      //   model: OrganizationModel,
      // })
      .populate({
        path: "assets",
        select: "-__v",
        model: AssetModel,
      });
    // console.log(noticeset);
    res.json({ noticeset });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addNoticeset = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const noticeset = new NoticeSetModel(req.body);
    await noticeset.save();
    res.json({ message: "Successfully added " + noticeset.name });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editNoticeset = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    await NoticeSetModel.updateOne(
      { _id: req.params.noticesetId },
      { $set: req.body }
    );
    res.json({ message: "Successfully updated noticeset" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
