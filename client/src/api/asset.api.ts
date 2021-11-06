import axios, { AxiosResponse } from "axios";
import {
  setAssets,
  setAssetsError,
  setAssetsLoading,
} from "../redux/slices/assetSlice";
import { AssetApiResponse } from "../utils/interface/Asset.interface";

export const fetchAssets = async (adminId: string, dispatch: any) => {
  dispatch(setAssetsLoading(true));
  try {
    const { data }: AxiosResponse<AssetApiResponse> = await axios.get(
      `http://localhost:5000/api/asset/all/${adminId}`
    );
    dispatch(setAssets(data.assets));
  } catch (error: any) {
    setAssetsError(error.message);
  }
  dispatch(setAssetsLoading(false));
};
