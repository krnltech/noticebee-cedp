import { FC, useEffect, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
// import Button from "@mui/material/Button";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectNoticeSet } from "../redux/slices/noticesetSlice";
import { fetchNoticeSets } from "../api/noticeset.api";
import AllNoticeSets from "../components/noticesets/AllNoticeSets";
import AddNoticeSets from "../components/noticesets/AddNoticeSets";

const NoticeSet: FC = () => {
  const [addNew, setAddNew] = useState(false);
  const { noticeSets, isLoading } = useSelector(selectNoticeSet);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();

  const toggleAddNew = () => {
    setAddNew((an) => !an);
  };

  const reloadNoticesets = () => {
    if (admin.id) {
      fetchNoticeSets(admin.id, dispatch);
    }
  };
  useEffect(() => {
    reloadNoticesets();
  }, [admin]);

  return (
    <div>
      <Typography variant="h4" my={1}>
        Notice Sets
      </Typography>
      <Button onClick={toggleAddNew}>
        {addNew ? "Cancel" : "Add new content"}
      </Button>
      {addNew ? (
        <AddNoticeSets
          reloadNoticesets={() => reloadNoticesets()}
          toggleAddNew={() => toggleAddNew()}
        />
      ) : (
        <AllNoticeSets noticeSets={noticeSets} isLoading={isLoading} />
      )}
    </div>
  );
};

export default NoticeSet;
