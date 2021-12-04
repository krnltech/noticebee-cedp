export interface Asset {
  _id: string;
  name: string;
  type: string;
  content: string;
  admin: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface AssetApiResponse {
  assets: Asset[];
}

export interface AssetAdd {
  name: string;
  type: string;
  content: string;
  admin: string;
  organization: string;
  tags?: string[];
  source: string;
}
