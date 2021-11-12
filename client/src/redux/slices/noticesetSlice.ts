import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoticeSet } from "../../utils/interface/NoticeSet.interface";

import type { RootState } from "../store";

interface NoticeSetSliceState {
  noticeSets: NoticeSet[];
  isLoading: boolean;
  errors: string;
}

const initialState: NoticeSetSliceState = {
  noticeSets: [],
  isLoading: false,
  errors: "",
};

export const noticeSetSlice = createSlice({
  name: "noticeSet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNoticeSetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNoticeSets: (state, action: PayloadAction<NoticeSet[]>) => {
      state.isLoading = false;
      state.noticeSets = action.payload;
      state.errors = "";
    },
    setNoticeSetsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearNoticeSets: (state) => {
      state.isLoading = false;
      state.noticeSets = [];
      state.errors = "";
    },
  },
});

export const {
  setNoticeSetsLoading,
  setNoticeSets,
  setNoticeSetsError,
  clearNoticeSets,
} = noticeSetSlice.actions;
export const selectNoticeSet = (state: RootState) => state.noticeSets;

export default noticeSetSlice.reducer;
