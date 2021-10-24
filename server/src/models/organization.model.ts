import { model, Schema } from "mongoose";
import { Organization } from "../interface/organizations.interface";

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    boards: [{ type: Schema.Types.ObjectId, ref: "Boards" }],
    admins: [{ type: Schema.Types.ObjectId, ref: "Admins" }],
  },
  { timestamps: true }
);

const OrganizationModel = model<Organization>(
  "Organizations",
  OrganizationSchema
);
export default OrganizationModel;
