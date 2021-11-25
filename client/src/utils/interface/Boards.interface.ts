export interface Board {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FetchBoardType = {
  _id: string;
  name: string;
  type?: string;
  rooms?: string[];
  headline?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BoardApiResponse = {
  boards: Array<Board>;
};

export type BoardHeadlineSetFormData = {
  headline: string;
};

export type BoardHeadlineEditApiResponse = {
  message: string;
};

export type LayoutFormData = {
  room: string[];
  type: string;
};
