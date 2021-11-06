export interface Asset {
  name: string;
  type: string;
  url: string;
  admin: string;
  organization: string;
}

export interface AssetApiResponse {
  assets: Asset[];
}
