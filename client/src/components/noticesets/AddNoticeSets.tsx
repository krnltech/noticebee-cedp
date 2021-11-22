import { useEffect, FC } from "react";
import { Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { fetchAssets } from "../../api/asset.api";
import NoticeSetForm from "./NoticeSetForm";

type Prop = {
  toggleAddNew: () => void;
  reloadNoticesets: () => void;
};

const AddNoticeSets: FC<Prop> = ({ toggleAddNew, reloadNoticesets }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector(selectAdmin);
  const reloadAsset = () => {
    if (admin.id) {
      fetchAssets(admin.id, dispatch);
    }
  };

  const defaultvalues = {
    name: "",
    interval: 0,
    organization: admin.org,
    admin: admin.id,
    assets: [],
    shouldSchedule: false,
    startTime: new Date(),
    endTime: new Date(),
  };

  const closeAction = () => {
    toggleAddNew();
    reloadNoticesets();
  };

  useEffect(() => {
    reloadAsset();
  }, [admin]);
  return (
    <div>
      <Typography variant="h4" my={1}>
        Add NoticeSets
      </Typography>
      <Paper sx={{ padding: 3, maxWidth: "400px" }}>
        <NoticeSetForm
          purpose="add"
          closeAction={closeAction}
          defaultvalues={defaultvalues}
          noticeSetId=""
        />
      </Paper>
    </div>
  );
};

export default AddNoticeSets;
