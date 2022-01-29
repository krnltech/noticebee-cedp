import { FC, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard } from "../api/boards.api";
import { fetchNoticeSets } from "../api/noticeset.api";
import EditHeadline from "../components/editBoard/EditHeadline";
import EditLayout from "../components/editBoard/EditLayout";
import Loader from "../components/layouts/Loader";
import { selectAdmin } from "../redux/slices/adminSlide";
import { FetchBoardType } from "../utils/interface/Boards.interface";
import io from "../api/socket.client";
// import { socket as io } from "../api/socket.api";

const EditNoticeBoard: FC = () => {
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
  const [noticeBoard, setNoticeBoard] = useState<FetchBoardType>();
  const { noticeBoardId } = useParams<{ noticeBoardId: string }>();
  const fetchNoticeBoard = async () => {
    setLoading(true);
    try {
      const board: FetchBoardType = await fetchBoard(noticeBoardId);
      console.log(board);
      setNoticeBoard(board);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    io.on("updateBoard", (args) => {
      console.log(args);
    });
    // return io.disconnect();
  }, []);
  useEffect(() => {
    fetchNoticeBoard();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {noticeBoard ? (
            <>
              <Typography variant="h4" my={1}>
                Edit noticeboard | {noticeBoard.name}
              </Typography>
              <EditLayout noticeBoard={noticeBoard} io={io} />
              <EditHeadline noticeBoard={noticeBoard} io={io} />
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
