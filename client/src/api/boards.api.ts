import axios, { AxiosResponse } from "axios";
import {
  setBoards,
  setBoardsError,
  setBoardsLoading,
} from "../redux/slices/boardSlice";
import { BoardApiResponse } from "../utils/interface/Boards.interface";

export const fetchBoards = async (adminId: string, dispatch: any) => {
  dispatch(setBoardsLoading(true));
  try {
    const { data }: AxiosResponse<BoardApiResponse> = await axios.get(
      `http://localhost:5000/api/admin/boards/${adminId}`
    );
    dispatch(setBoards(data.boards));
  } catch (error: any) {
    setBoardsError(error.message);
  }
  dispatch(setBoardsLoading(false));
};
