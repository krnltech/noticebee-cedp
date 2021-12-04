import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/boards/BoardComponent";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectBoard } from "../redux/slices/boardSlice";
import { fetchBoards } from "../api/boards.api";
import { Container, Typography } from "@mui/material";
import Loader from "../components/layouts/Loader";
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
    <Container>
      <Typography variant="h4" my={1}>
        All boards
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {boards.map((board, id) => (
            <BoardComponent board={board} key={id} />
          ))}
        </>
      )}
    </Container>
  );
};

export default Boards;
