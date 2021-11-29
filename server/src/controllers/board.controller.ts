import { Request, Response } from "express";
import BoardModel from "../models/board.model";

export const getBoard = async (req: Request, res: Response) => {
  try {
    console.log("hey");
    const board = await BoardModel.findOne({
      _id: req.params.boardId,
    })
      .populate({
        path: "rooms",
        select: "-__v -organization -admin",
        populate: { path: "assets", select: "-__v" },
      })
      .select("-__v");
    res.json({
      board,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
