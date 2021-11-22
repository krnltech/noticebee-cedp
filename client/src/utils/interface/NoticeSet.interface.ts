import { Asset } from "./Asset.interface";

export interface NoticeSet {
  _id: string;
  name: string;
  interval: number | null;
  startTime: string | null;
  endTime: string | null;
  admin: any;
  organization: any;
  assets: Asset[];
  shouldSchedule: boolean;
}

export interface NoticeSetApiResponse {
  noticesets: NoticeSet[];
}

export interface NoticeSetAddApiResponse {
  message: string;
}

export type NoticeSetAddFormData = {
  name: string;
  interval: number | null;
  startTime: Date | null;
  endTime: Date | null;
  admin: string;
  organization: string;
  assets: string[];
  shouldSchedule: boolean;
};

export type NoticeSetEditDefault = {
  _id: string;
  name: string;
  interval: number | null;
  startTime: string | null;
  endTime: string | null;
  admin: any;
  organization: any;
  assets: string[];
  shouldSchedule: boolean;
};
