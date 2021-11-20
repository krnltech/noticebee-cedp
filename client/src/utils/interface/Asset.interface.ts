export interface Asset {
  _id: string;
  name: string;
  type: string;
  url: string;
  admin: string;
  organization: string;
}

export interface AssetApiResponse {
  assets: Asset[];
}
