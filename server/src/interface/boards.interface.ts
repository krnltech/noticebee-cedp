import { Types } from "mongoose";

export interface Board {
  name: string;
  type: string;
  rooms: Types.ObjectId[];
  headline: string;
}
