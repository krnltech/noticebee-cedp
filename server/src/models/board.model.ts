import mongoose from "mongoose";
import { Board } from "../interface/boards.interface";

const BoardsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: "one" },
    room: [
      { type: mongoose.Schema.Types.ObjectId, ref: "NoticeSet", default: [] },
    ],
    headline: {
      headlineOne: { type: String, default: null },
      headlineTwo: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const BoardModel = mongoose.model<Board>("Boards", BoardsSchema);
export default BoardModel;
