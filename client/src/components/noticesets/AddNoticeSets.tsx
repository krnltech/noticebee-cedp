import { useEffect, FC } from "react";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { fetchAssets } from "../../api/asset.api";
import NoticeSetForm from "./NoticeSetForm";

type Prop = {
  toggleAddNew: () => void;
};

const AddNoticeSets: FC<Prop> = ({ toggleAddNew }) => {
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

  useEffect(() => {
    reloadAsset();
  }, [admin]);
  return (
    <div>
      <h1>Add NoticeSets</h1>
      <Paper sx={{ padding: 3, maxWidth: "400px" }}>
        <NoticeSetForm
          purpose="add"
          closeAction={() => toggleAddNew()}
          defaultvalues={defaultvalues}
          noticeSetId=""
        />
      </Paper>
    </div>
  );
};

export default AddNoticeSets;
