import { Request, Response } from "express";
import BoardModel from "../models/board.model";

export const getBoard = async (req: Request, res: Response) => {
  try {
    const board = await BoardModel.findOne({
      _id: req.params.boardId,
    })
      // .lean()
      .populate({
        path: "rooms",
        select: "-__v -organization -admin",
        populate: { path: "assets", select: "-__v" },
      })
      .select("-__v");
    let moddedBoard: any = {};
    moddedBoard._id = board?._id;
    moddedBoard.name = board?.name;
    moddedBoard.type = board?.type;
    moddedBoard.headline = board?.headline;
    moddedBoard.rooms = board?.rooms.map((room: any) => {
      let moddedRoom: any = {};
      moddedRoom._id = room?._id;
      moddedRoom.name = room?.name;
      moddedRoom.interval = room?.interval;
      moddedRoom.startTime = room?.startTime;
      moddedRoom.endTime = room?.endTime;
      moddedRoom.shouldSchedule = room?.shouldSchedule;
      moddedRoom.assets = room?.assets.map((asset: any) => {
        let moddedAsset: any = {};
        moddedAsset._id = asset?._id;
        moddedAsset.name = asset?.name;
        if (asset?.type.includes("image")) {
          moddedAsset.type = "image";
        } else if (asset?.type.includes("video")) {
          moddedAsset.type = "video";
        } else if (asset?.type.includes("text")) {
          moddedAsset.type = "text";
        } else {
          moddedAsset.type = "pdf";
        }
        moddedAsset.admin = asset?.admin;
        moddedAsset.organization = asset?.organization;
        if (asset.source === "text") {
          moddedAsset.content = asset.content;
          moddedAsset.url = "";
        } else {
          moddedAsset.content = "";
          moddedAsset.url = asset.content;
        }
        return moddedAsset;
      });
      return moddedRoom;
    });
    res.json({
      board: moddedBoard,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
