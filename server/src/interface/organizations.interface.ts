import { Types } from "mongoose";
export interface Organization {
  name: string;
  email: string;
  phone: string;
  boards?: Types.ObjectId[];
  admins?: Types.ObjectId[];
}
