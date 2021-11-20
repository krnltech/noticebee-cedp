import mongoose from "mongoose";
import { NoticeSet } from "../interface/noticesets.interface";

const NoticeSetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    interval: { type: Number },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admins" }],
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
    shouldSchedule: {
      type: Boolean,
      required: true,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    ],
  },
  { timestamps: true }
);

const NoticeSetModel = mongoose.model<NoticeSet>("NoticeSet", NoticeSetSchema);
export default NoticeSetModel;
