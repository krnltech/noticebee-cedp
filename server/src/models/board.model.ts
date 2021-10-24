import mongoose from "mongoose";
import { Board } from "../interface/boards.interface";

const BoardsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const BoardModel = mongoose.model<Board>("Boards", BoardsSchema);
export default BoardModel;
