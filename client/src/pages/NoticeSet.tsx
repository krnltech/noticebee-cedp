import { FC, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
// import Button from "@mui/material/Button";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectNoticeSet } from "../redux/slices/noticesetSlice";
import { fetchNoticeSets } from "../api/noticeset.api";

const NoticeSet: FC = () => {
  // const [addNew, setAddNew] = useState(false);
  const { noticeSets, isLoading } = useSelector(selectNoticeSet);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const reloadAsset = () => {
    if (admin.org) {
      fetchNoticeSets(admin.org, dispatch);
    }
  };
  useEffect(() => {
    reloadAsset();
  }, [admin]);
  // all/:adminId
  return (
    <div>
      <h1>ContentLibrary</h1>
      {/* <Button onClick={() => setAddNew((an) => !an)}>
        {addNew ? "Cancel" : "Add new content"}
      </Button> */}
      {/* {assets.map((asset, id) => (
        <Card key={id} variant="outlined">
          <CardContent>
            <Typography variant="h4">{asset.name}</Typography>
            <Typography variant="subtitle1">{asset.type}</Typography>
            <Typography variant="body1">{asset.url}</Typography>
          </CardContent>
        </Card>
      ))} */}
    </div>
  );
};

export default NoticeSet;
