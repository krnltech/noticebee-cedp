import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../../utils/interface/Asset.interface";

import type { RootState } from "../store";

interface AssetSliceState {
  assets: Asset[];
  isLoading: boolean;
  errors: string;
}

const initialState: AssetSliceState = {
  assets: [],
  isLoading: false,
  errors: "",
};

export const assetSlice = createSlice({
  name: "asset",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAssetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.isLoading = false;
      state.assets = action.payload;
      state.errors = "";
    },
    setAssetsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearAssets: (state) => {
      state.isLoading = false;
      state.assets = [];
      state.errors = "";
    },
  },
});

export const { setAssetsLoading, setAssets, setAssetsError, clearAssets } =
  assetSlice.actions;
export const selectAsset = (state: RootState) => state.assets;

export default assetSlice.reducer;
