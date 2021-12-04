import mongoose from "mongoose";
import { Tag } from "../interface/assets.interface";

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const TagModel = mongoose.model<Tag>("Tags", TagSchema);
export default TagModel;
