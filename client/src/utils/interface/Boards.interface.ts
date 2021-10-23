export interface Board {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BoardApiResponse = {
  boards: Array<Board>;
};
