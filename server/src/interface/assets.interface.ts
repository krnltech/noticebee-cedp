import { Types } from "mongoose";

export interface Asset {
  name: string;
  type: string;
  content: string;
  admin: Types.ObjectId;
  organization: Types.ObjectId;
}

export interface Tag {
  name: string;
}
