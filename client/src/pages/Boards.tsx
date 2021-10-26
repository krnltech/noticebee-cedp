import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/boards/BoardComponent";
import { selectAdmin } from "../redux/slices/adminSlide";
import { fetchBoards, selectBoard } from "../redux/slices/boardSlice";

const Boards: FC = () => {
  const { boards } = useSelector(selectBoard);
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector(selectAdmin);

  useEffect(() => {
    if (admin.id) {
      dispatch(fetchBoards(admin.id));
    }
  }, []);
  return (
    <div>
      {boards.map((board, id) => (
        <BoardComponent board={board} key={id} />
      ))}
    </div>
  );
};

export default Boards;
