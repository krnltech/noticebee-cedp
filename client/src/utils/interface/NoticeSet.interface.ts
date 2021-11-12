export interface NoticeSet {
  name: string;
  interval: number | null;
  startTime: string | null;
  endTime: string | null;
  admin: any;
  organization: any;
}

export interface NoticeSetApiResponse {
  noticesets: NoticeSet[];
}
