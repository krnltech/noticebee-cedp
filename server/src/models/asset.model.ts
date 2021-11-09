import mongoose from "mongoose";
import { Asset } from "../interface/assets.interface";

const AssetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admins" }],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
  },
  { timestamps: true }
);

const AssetModel = mongoose.model<Asset>("Assets", AssetSchema);
export default AssetModel;
