import { Types } from "mongoose";

export interface Asset {
  name: string;
  type: string;
  url: string;
  admin: Types.ObjectId;
  organization: Types.ObjectId;
}

export interface Tag {
  name: string;
}
