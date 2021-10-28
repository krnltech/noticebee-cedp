import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/boards/BoardComponent";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectBoard } from "../redux/slices/boardSlice";
import { fetchBoards } from "../api/boards.api";
const Boards: FC = () => {
  const { boards, isLoading } = useSelector(selectBoard);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (admin.id) {
      fetchBoards(admin.id, dispatch);
    }
  }, [admin]);
  return (
    <div>
      <h1>All boards</h1>
      {isLoading ? (
        <p>loading . . .</p>
      ) : (
        <>
          {boards.map((board, id) => (
            <BoardComponent board={board} key={id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Boards;
