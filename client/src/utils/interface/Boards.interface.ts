export interface Board {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FetchBoardType = {
  _id: string;
  name: string;
  type: string;
  rooms: string[];
  headline: {
    headlineOne: string;
    headlineTwo: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type BoardApiResponse = {
  boards: Array<Board>;
};

export type BoardHeadlineSetFormData = {
  headlineOne: string;
  headlineTwo: string;
};

export type BoardHeadlineEditApiResponse = {
  message: string;
};
