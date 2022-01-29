import mongoose from "mongoose";
import { Admin } from "../interface/admins.interface";

enum AdminRoles {
  central = "central",
  local = "local",
  nu = "nu",
}

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: AdminRoles },
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
