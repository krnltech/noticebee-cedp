import axios, { AxiosResponse } from "axios";
import {
  setBoards,
  setBoardsError,
  setBoardsLoading,
} from "../redux/slices/boardSlice";
import { Board, BoardApiResponse } from "../utils/interface/Boards.interface";

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

export const fetchBoard = async (noticeBoardId: string) => {
  return new Promise<Board>(async function (resolve, reject) {
    try {
      const { data }: AxiosResponse<{ board: Board }> = await axios.get(
        `http://localhost:5000/api/admin/board/${noticeBoardId}`
      );
      resolve(data.board);
    } catch (error: any) {
      console.log(error.message);
      reject(error);
    }
  });
};
