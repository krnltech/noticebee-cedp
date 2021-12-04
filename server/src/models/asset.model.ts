import mongoose from "mongoose";
import { Asset } from "../interface/assets.interface";

const AssetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    source: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const AssetModel = mongoose.model<Asset>("Assets", AssetSchema);
export default AssetModel;
