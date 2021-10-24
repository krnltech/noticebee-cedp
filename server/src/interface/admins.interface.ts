import { Types } from "mongoose";

export interface Admin {
  name: string;
  email: string;
  password: string;
  role: string;
  boards?: Types.ObjectId[];
  organization: Types.ObjectId;
}
