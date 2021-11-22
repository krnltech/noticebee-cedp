import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchBoard } from "../api/boards.api";
import EditHeadline from "../components/editBoard/EditHeadline";
import EditLayout from "../components/editBoard/EditLayout";
import { Board } from "../utils/interface/Boards.interface";

const EditNoticeBoard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [noticeBoard, setNoticeBoard] = useState<any>();
  const { noticeBoardId } = useParams<{ noticeBoardId: string }>();
  const fetchNoticeBoard = async () => {
    setLoading(true);
    try {
      const board = await fetchBoard(noticeBoardId);
      console.log(board);
      setNoticeBoard(board);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchNoticeBoard();
  }, []);
  return (
    <>
      {loading ? (
        <Typography paragraph my={1}>
          . . . Loading . . .
        </Typography>
      ) : (
        <Container>
          <Typography variant="h4" my={1}>
            Edit noticeboard | {noticeBoard.name}
          </Typography>
          <EditLayout />
          <EditHeadline />
        </Container>
      )}
    </>
  );
};

export default EditNoticeBoard;
