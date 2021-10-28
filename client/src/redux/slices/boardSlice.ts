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

export const fetchBoards = createAsyncThunk(
  "loadBoards",
  async (adminId: any) => {
    const { data }: AxiosResponse<BoardApiResponse> = await axios.get(
      `http://localhost:5000/api/admin/boards/${adminId}`
    );
    return data.boards;
  }
);

export const boardSlice = createSlice({
  name: "board",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBoardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.isLoading = false;
      state.boards = action.payload;
      state.errors = "";
    },
    setBoardsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearBoards: (state) => {
      state.isLoading = false;
      state.boards = [];
      state.errors = "";
    },
  },
});

export const { setBoardsLoading, setBoards, setBoardsError, clearBoards } =
  boardSlice.actions;
export const selectBoard = (state: RootState) => state.boards;

export default boardSlice.reducer;
