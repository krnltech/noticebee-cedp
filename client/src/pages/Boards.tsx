import { FC } from "react";
import { useSelector } from "react-redux";
import BoardComponent from "../components/boards/BoardComponent";
import { selectBoard } from "../redux/slices/boardSlice";

const Boards: FC = () => {
  const { boards } = useSelector(selectBoard);

  return (
    <div>
      {boards.map((board, id) => (
        <BoardComponent board={board} key={id} />
      ))}
    </div>
  );
};

export default Boards;
