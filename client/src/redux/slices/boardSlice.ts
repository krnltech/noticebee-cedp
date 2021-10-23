import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  Board,
  BoardApiResponse,
} from "../../utils/interface/Boards.interface";
import type { RootState } from "../store";

interface BoardSliceState {
  boards: Board[];
  isLoading: boolean;
  errors: string;
}

const initialState: BoardSliceState = {
  boards: [],
  isLoading: false,
  errors: "",
};

export const fetchBoards = createAsyncThunk("loadBoards", async () => {
  const { data }: AxiosResponse<BoardApiResponse> = await axios.get(
    "http:localhost:5000/api/admin/boards"
  );
  return data.boards;
});

export const boardSlice = createSlice({
  name: "board",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.isLoading = action.payload;
    // },
    // setErrors: (state, action: PayloadAction<string>) => {
    //   state.errors = action.payload;
    // },
    // setBoards: (state, action: PayloadAction<Board[]>) => {
    //   state.boards = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoards.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.boards = payload;
    });
    builder.addCase(fetchBoards.rejected, (state, { error }) => {
      state.errors = error.message || "";
      state.isLoading = false;
    });
  },
});

export const selectBoard = (state: RootState) => state.boards;

export default boardSlice.reducer;
