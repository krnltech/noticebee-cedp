import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard } from "../api/boards.api";
import { fetchNoticeSets } from "../api/noticeset.api";
import EditHeadline from "../components/editBoard/EditHeadline";
import EditLayout from "../components/editBoard/EditLayout";
import { selectAdmin } from "../redux/slices/adminSlide";
import { Board } from "../utils/interface/Boards.interface";

const EditNoticeBoard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();

  const reloadNoticesets = () => {
    if (admin.id) {
      fetchNoticeSets(admin.id, dispatch);
    }
  };
  useEffect(() => {
    reloadNoticesets();
  }, [admin]);
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
          {noticeBoard ? (
            <>
              <Typography variant="h4" my={1}>
                Edit noticeboard | {noticeBoard.name}
              </Typography>
              <EditLayout noticeBoard={noticeBoard} />
              <EditHeadline noticeBoard={noticeBoard} />
            </>
          ) : (
            <Typography variant="h1" my={1}>
              Wrong board -.-
            </Typography>
          )}
        </Container>
      )}
    </>
  );
};

export default EditNoticeBoard;
