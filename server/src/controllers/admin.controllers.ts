import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Board } from "../interface/boards.interface";
import AdminModel from "../models/admin.model";
import BoardModel from "../models/board.model";
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
    if (admin?.role === "master") {
      const organization = await OrganizationModel.findOne({
        _id: admin.organization,
      })
        .select("-__v")
        .populate({
          path: "boards",
          select: "_id name",
          model: BoardModel,
        });
      console.log(organization);
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

// const testFunc = async () => {
//   const o = await OrganizationModel.find();
//   console.log(o);
// };
// testFunc();
