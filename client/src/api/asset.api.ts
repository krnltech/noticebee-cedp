import axios from "../utils/axios.base";
import { AxiosResponse } from "axios";
import {
  setAssets,
  setAssetsError,
  setAssetsLoading,
} from "../redux/slices/assetSlice";
import { AssetAdd, AssetApiResponse } from "../utils/interface/Asset.interface";
import { MessageResponse } from "../utils/interface/Axios.interface";

export const fetchAssets = async (adminId: string, dispatch: any) => {
  dispatch(setAssetsLoading(true));
  try {
    const { data }: AxiosResponse<AssetApiResponse> = await axios.get(
      `/api/asset/all/${adminId}`
    );
    dispatch(setAssets(data.assets));
  } catch (error: any) {
    setAssetsError(error.message);
  }
  dispatch(setAssetsLoading(false));
};

export const addTextAsset = async (formData: AssetAdd) => {
  return new Promise<string>(async function (resolve, reject) {
    try {
      const { data }: AxiosResponse<MessageResponse> = await axios.post(
        "/api/asset/text/upload",
        formData
      );
      resolve(data.message);
    } catch (error: any) {
      reject(error);
    }
  });
};
