import mongoose from "mongoose";
import { Admin } from "../interface/admins.interface";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boards" }],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model<Admin>("Admins", AdminSchema);
export default AdminModel;
