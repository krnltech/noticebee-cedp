import { Types } from "mongoose";

export interface NoticeSet {
  name: string;
  interval: number | null;
  startTime: string | null;
  endTime: string | null;
  admin: Types.ObjectId;
  organization: Types.ObjectId;
  shouldSchedule: boolean;
  assets: Types.ObjectId[];
}
